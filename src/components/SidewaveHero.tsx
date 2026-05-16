import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";

const SIDEWAVE_BASE = "/sidewave";

const CSS_FILES = [
  `${SIDEWAVE_BASE}/css/style.css`,
  `${SIDEWAVE_BASE}/css/index.css`,
  `${SIDEWAVE_BASE}/css/responsive.css`,
];

const JS_FILES = [
  `${SIDEWAVE_BASE}/js/jquery.js`,
  `${SIDEWAVE_BASE}/js/jquery.easing.min.js`,
  `${SIDEWAVE_BASE}/js/unity-loader.js`,
  `${SIDEWAVE_BASE}/js/ui-interactions.js`,
  `${SIDEWAVE_BASE}/js/scroll-visuals.js`,
  `${SIDEWAVE_BASE}/js/scroll-navigation.js`,
];

const TAG = "data-sidewave";

// Unity timeline range we actually want the user to traverse.
// 720 = past the flashing red figure.
// 3260 = end of the originList (orb) scene, BEFORE the dark transition
// frames between Origin and the next chapter. Landing the user on the orb
// rather than the black inter-chapter transition keeps the closing beat
// visually rich.
const FRAME_START = 720;
const FRAME_END = 3260;

// Total Unity frames (announced by TimelineLength); read at runtime but
// hard-fallback for the math if not set yet.
const FALLBACK_TOTAL_FRAMES = 12767;

// Hero zone height as a multiple of viewport. 2.4× keeps the snap-scroll
// waypoints close enough that the user reaches the end in a few wheel ticks
// while leaving room for the Unity timeline to breathe between beats.
const HERO_HEIGHT_VH = 2.4;

// Per-snap animation duration. SideWave's default is 1200ms which makes a
// 9-waypoint hero feel sluggish; 600ms keeps each transition readable but
// snappy. We override the global on `window` after the script loads — the
// `var` at file scope in scroll-navigation.js maps to window.* so the
// closure inside RebuildPositions reads the live value.
const SNAP_DURATION_MS = 600;
const SNAP_IGNORE_MS = 90;

// Compute the data-frame-count attribute for a given Unity frame target.
//
// CalculateDataTrigger in scroll-navigation.js does:
//     triggerStart = (val / timelineFrameCount) * totalHeight
//
// So an overlay with data-frame-count=val triggers at scrollY = triggerStart.
// Unity (with our SendMessage remap) is at frame F when the user is at:
//     scrollY = totalHeight * (F - FRAME_START) / (FRAME_END - FRAME_START)
//
// Solving for val: val = timelineFrameCount * (F - FRAME_START) / (FRAME_END - FRAME_START)
const dfc = (unityFrame: number): string =>
  String(
    Math.round(
      FALLBACK_TOTAL_FRAMES *
        (unityFrame - FRAME_START) /
        (FRAME_END - FRAME_START)
    )
  );

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.setAttribute(TAG, "");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });

const loadCss = (href: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute(TAG, "");
  document.head.appendChild(link);
  return link;
};

// Shrink the Unity scroll zone to a sensible height. Keep the canvas as
// position:fixed (SideWave's default) and instead fade its opacity to 0 once
// the user scrolls past the hero zone — much more reliable than sticky
// positioning which fights with Unity's internal framebuffer sizing.
const installHeroZone = (totalFrames: number) => {
  const unityContainer = document.getElementById("unityContainer");
  const webContainer = document.getElementById("webContainer");
  if (!unityContainer || !webContainer) return;

  const heroH = window.innerHeight * HERO_HEIGHT_VH;
  unityContainer.style.height = `${heroH}px`;
  unityContainer.style.position = "relative";

  // Keep position:fixed so Unity's framebuffer stays full-viewport.
  // We'll fade the canvas opacity based on scroll position separately.
  webContainer.style.position = "fixed";
  webContainer.style.top = "0";
  webContainer.style.left = "0";
  webContainer.style.width = "100vw";
  webContainer.style.height = "100vh";
  // CRITICAL: z-index 0 so SideWave's text overlays (which are also
  // position:fixed with default z-index:auto) stack ABOVE the canvas.
  // Without this, the canvas hides every overlay including the lateral
  // menu, scroll-overlay-text beats, and originList labels.
  webContainer.style.zIndex = "0";
  webContainer.style.transition = "opacity 280ms ease";
  webContainer.style.pointerEvents = "none";
  // Force visible/opaque in case an earlier scroll handler latched these off
  // (can happen if the user scrolled before installHeroZone fired).
  webContainer.style.opacity = "1";
  webContainer.style.visibility = "visible";

  // Wrap SendMessage('Timeline','SetScrollValue',v) so v in [0,100000] (a
  // raw scroll fraction from scroll-navigation.js) gets remapped to a Unity
  // value covering only FRAME_START..FRAME_END of the timeline.
  const w = window as unknown as {
    gameInstance?: {
      SendMessage: (obj: string, fn: string, val?: number | string) => void;
      __sidewaveWrapped?: boolean;
    };
  };
  if (w.gameInstance && !w.gameInstance.__sidewaveWrapped) {
    const original = w.gameInstance.SendMessage.bind(w.gameInstance);
    const SCALE = 100000;
    const startUnit = (FRAME_START / totalFrames) * SCALE;
    const endUnit = (FRAME_END / totalFrames) * SCALE;
    w.gameInstance.SendMessage = function (obj, fn, val) {
      if (
        obj === "Timeline" &&
        fn === "SetScrollValue" &&
        typeof val === "number"
      ) {
        const t = Math.min(Math.max(val / SCALE, 0), 1);
        const remapped = Math.round(startUnit + t * (endUnit - startUnit));
        return original(obj, fn, remapped);
      }
      return original(obj, fn, val);
    };
    w.gameInstance.__sidewaveWrapped = true;
  }

  // Force scroll-navigation.js to recompute its trigger-start positions
  // against the new (much shorter) container.
  const $ = (window as unknown as { jQuery?: (target: Window) => { trigger: (e: string) => void } }).jQuery;
  $?.(window).trigger("resize");
};

const SLOW_LOAD_MS = 2500;
const STORAGE_KEY = "pointblank_hero_mode";

const SidewaveHero = ({ onSkip }: { onSkip?: () => void }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unityReady, setUnityReady] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);

  // If Unity hasn't finished its bootstrap inside SLOW_LOAD_MS, surface a
  // "Switch to lite hero" affordance so users on slow networks / weak
  // GPUs aren't stuck staring at the spinner.
  useEffect(() => {
    if (unityReady) return;
    const t = window.setTimeout(() => setSlowLoad(true), SLOW_LOAD_MS);
    return () => window.clearTimeout(t);
  }, [unityReady]);

  // Treat the hero as "ready" only when SideWave has rebuilt its snap
  // scrollPositions[] — that's the moment the wheel/touch handlers can
  // actually advance through waypoints. Before that, even if the loader
  // gif has disappeared, scrollPositions is empty and the first 2-3
  // wheel ticks get swallowed by snap-scroll's empty next()/prev().
  useEffect(() => {
    if (!loaded) return;
    let cancelled = false;
    const check = () => {
      if (cancelled) return true;
      const w = window as unknown as {
        snapScroll?: { getPositions: () => number[] };
      };
      const positions = w.snapScroll?.getPositions?.() ?? [];
      // Two-position minimum: position 0 is added unconditionally; a
      // populated rest means CalculateDataTrigger ran against a real
      // Unity timeline length.
      if (positions.length > 1) {
        setUnityReady(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const iv = window.setInterval(() => {
      if (check()) window.clearInterval(iv);
    }, 120);
    return () => {
      cancelled = true;
      window.clearInterval(iv);
    };
  }, [loaded]);

  // Lock native scroll while the hero is initialising. SideWave's
  // html.no-scroll rule disables overflow AND makes its wheel/touch
  // handlers return early, so wheel ticks during this window are
  // dropped instead of being captured-but-ignored.
  useEffect(() => {
    if (unityReady) {
      document.documentElement.classList.remove("no-scroll");
      return;
    }
    document.documentElement.classList.add("no-scroll");
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [unityReady]);

  const switchToLite = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "light");
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    window.location.reload();
  };

  useEffect(() => {
    document.body.classList.add("sidewave-active");

    const links = CSS_FILES.map(loadCss);

    let cancelled = false;

    (async () => {
      try {
        for (const src of JS_FILES) {
          if (cancelled) return;
          await loadScript(src);
        }
        if (!cancelled) setLoaded(true);

        // Speed up SideWave's snap-scroll. The `var` declarations at the top
        // of scroll-navigation.js bind to window, and RebuildPositions /
        // goToIndex read them on every snap — so updating them here takes
        // effect immediately without forking the vendor script.
        const wg = window as unknown as {
          defaultAutoScrollDuration?: number;
          ignoreMs?: number;
        };
        wg.defaultAutoScrollDuration = SNAP_DURATION_MS;
        wg.ignoreMs = SNAP_IGNORE_MS;

        // After scroll-navigation.js installs its TimelineLength listener,
        // attach our own so we run AFTER SetPageScroll (which it calls inside
        // the same handler) and can override the container/canvas styles.
        const w = window as unknown as {
          jQuery?: (target: Window) => {
            on: (
              evt: string,
              handler: (e: { arg: string }) => void
            ) => void;
          };
        };
        const $win = w.jQuery?.(window);
        $win?.on("TimelineLength", (e: { arg: string }) => {
          const total = parseInt(e.arg, 10) || FALLBACK_TOTAL_FRAMES;
          // Defer one tick so SideWave's SetPageScroll has run first.
          setTimeout(() => installHeroZone(total), 60);
          // And again later in case Unity finishes initialising in between.
          setTimeout(() => installHeroZone(total), 600);
        });
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      }
    })();

    // Fade the Unity canvas based on scroll position. While inside the hero
    // zone the canvas is fully opaque; as the user crosses into the React
    // sections below it, opacity glides to 0.
    //
    // CRITICAL: skip the fade if the hero zone hasn't been installed yet.
    // installHeroZone resizes unityContainer to HERO_HEIGHT_VH viewports;
    // before that runs the container may be tiny, which would compute a
    // very-low fadeStart and immediately hide the canvas before Unity ever
    // gets a chance to be visible.
    const onScrollFade = () => {
      const unityContainer = document.getElementById("unityContainer");
      const webContainer = document.getElementById("webContainer");
      if (!unityContainer || !webContainer) return;
      // Guard: hero zone must be at least 2× viewport for the fade math to
      // make sense. Anything less means installHeroZone hasn't fired yet.
      if (unityContainer.offsetHeight < window.innerHeight * 2) {
        webContainer.style.opacity = "1";
        webContainer.style.visibility = "visible";
        document.body.classList.remove("sidewave-past-hero");
        return;
      }
      const heroBottom = unityContainer.offsetTop + unityContainer.offsetHeight;
      const fadeStart = heroBottom - window.innerHeight * 0.3;
      const fadeEnd = heroBottom + 50;
      const y = window.scrollY + window.innerHeight; // viewport bottom
      let opacity = 1;
      if (y > fadeStart) {
        opacity = Math.max(0, 1 - (y - fadeStart) / (fadeEnd - fadeStart));
      }
      webContainer.style.opacity = String(opacity);
      // Don't use visibility:hidden — it can latch and never un-hide if a
      // scroll event doesn't fire after installHeroZone. pointer-events:none
      // (set in installHeroZone) is enough to make the canvas non-blocking.
      webContainer.style.visibility = "visible";

      // Mirror the canvas fade onto the CTA overlay and Scroll Down pill —
      // both are position:fixed and would otherwise stick to the viewport
      // while the user scrolls the rest of the page. Use a body-level class
      // so the rule is reusable from CSS without per-element JS.
      const pastHero = opacity <= 0.05;
      document.body.classList.toggle("sidewave-past-hero", pastHero);
    };
    window.addEventListener("scroll", onScrollFade, { passive: true });
    // Run once on mount so an initial state is set even before the first scroll.
    onScrollFade();

    // Release SideWave's wheel capture once the user is at the last snap
    // waypoint and tries to scroll further. With enableAutoScroll = false,
    // SideWave's wheel handler returns early without preventDefault, so the
    // browser's native scroll resumes and the user can flow past the hero
    // into the React content below.
    const onWheelEscape = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      const w = window as unknown as {
        enableAutoScroll?: boolean;
        snapScroll?: {
          indexFromScrollTop: () => number;
          getPositions: () => number[];
        };
      };
      if (w.enableAutoScroll === false) return;
      const sn = w.snapScroll;
      if (!sn) return;
      const positions = sn.getPositions();
      if (!positions.length) return;
      if (sn.indexFromScrollTop() === positions.length - 1) {
        w.enableAutoScroll = false;
      }
    };
    // Re-engage SideWave's snap-scroll ONLY when the user has scrolled all
    // the way back to the very top. Re-engaging mid-scroll (anywhere inside
    // the hero zone) makes snap-scroll seize the wheel/touch in the middle
    // of the user's momentum, which feels like a jarring "blip".
    //
    // Critical: we watch the scroll EVENT for this, not the wheel/touch
    // event. The wheel/touch event fires BEFORE the browser updates the
    // scroll position, so checking scrollY inside a wheel handler reads the
    // pre-scroll value — a fast wheel tick that crosses the threshold in
    // one shot would never see scrollY ≤ threshold and snap would never
    // re-engage. The scroll event fires after the position is committed,
    // so it always catches the threshold crossing.
    const REENGAGE_TOP_PX = 40;
    const onScrollReengage = () => {
      const w = window as unknown as { enableAutoScroll?: boolean };
      if (w.enableAutoScroll !== false) return;
      if (window.scrollY <= REENGAGE_TOP_PX) {
        w.enableAutoScroll = true;
      }
    };
    window.addEventListener("scroll", onScrollReengage, { passive: true });
    window.addEventListener("wheel", onWheelEscape, {
      passive: true,
      capture: true,
    });

    // Mobile equivalent of the wheel escape. SideWave's touchmove handler
    // calls preventDefault() unconditionally while enableAutoScroll is true,
    // which traps mobile users inside the hero. We listen in the capture
    // phase so we can flip enableAutoScroll=false BEFORE SideWave's
    // bubble-phase touchmove runs — once it sees the flag, it bails out
    // and the browser's native scroll takes over.
    let touchStartY = 0;
    const isAtLastWaypoint = () => {
      const w = window as unknown as {
        snapScroll?: {
          indexFromScrollTop: () => number;
          getPositions: () => number[];
        };
      };
      const sn = w.snapScroll;
      if (!sn) return false;
      const positions = sn.getPositions();
      if (!positions.length) return false;
      return sn.indexFromScrollTop() === positions.length - 1;
    };
    const onTouchStartTrack = (e: TouchEvent) => {
      if (e.touches && e.touches.length) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMoveEscape = (e: TouchEvent) => {
      if (!e.touches || !e.touches.length) return;
      const dy = touchStartY - e.touches[0].clientY; // >0 = scrolling down
      const w = window as unknown as { enableAutoScroll?: boolean };
      if (dy > 12 && w.enableAutoScroll !== false && isAtLastWaypoint()) {
        w.enableAutoScroll = false;
      }
      // Re-engagement is handled by onScrollReengage on the scroll event,
      // which sees the post-update scrollY and catches threshold crossings
      // even when the gesture leaps past 0 in one fling.
    };
    window.addEventListener("touchstart", onTouchStartTrack, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", onTouchMoveEscape, {
      passive: true,
      capture: true,
    });

    // Idle "keep scrolling" hint: a subtle pulse on the Scroll Down pill
    // that appears 750ms after the user stops scrolling, but only between
    // waypoints (not at the first frame, not on the last waypoint, not
    // past the hero). The snap-scroll is intentionally paced and users
    // sometimes don't realise another scroll will reveal more.
    let hintTimer: number | null = null;
    // Short enough that the cue appears "instantly" once the snap settles.
    // The snap-scroll fires continuous scroll events at ~60fps while
    // animating, so any value >32ms reliably waits out the animation
    // without lingering after it ends.
    const HINT_IDLE_MS = 150;
    const clearHint = () => {
      document.body.classList.remove("sidewave-hint-active");
      if (hintTimer !== null) {
        window.clearTimeout(hintTimer);
        hintTimer = null;
      }
    };
    const scheduleHint = () => {
      if (hintTimer !== null) window.clearTimeout(hintTimer);
      hintTimer = window.setTimeout(() => {
        // Don't nudge if the hero is already done, the user is at the very
        // start (we want them to take in the opening beat first), or the
        // canvas has faded out.
        const w = window as unknown as {
          snapScroll?: {
            indexFromScrollTop: () => number;
            getPositions: () => number[];
          };
        };
        const sn = w.snapScroll;
        if (!sn) return;
        const positions = sn.getPositions();
        if (!positions.length) return;
        const idx = sn.indexFromScrollTop();
        const last = positions.length - 1;
        if (idx === 0 || idx === last) return;
        if (document.body.classList.contains("sidewave-past-hero")) return;
        document.body.classList.add("sidewave-hint-active");
      }, HINT_IDLE_MS);
    };
    const onScrollForHint = () => {
      // Any movement immediately retracts the hint and restarts the timer.
      document.body.classList.remove("sidewave-hint-active");
      scheduleHint();
    };
    window.addEventListener("scroll", onScrollForHint, { passive: true });
    // Don't seed a hint on initial mount — wait for the user's first action.

    return () => {
      cancelled = true;
      document.body.classList.remove("sidewave-active");
      document.body.classList.remove("sidewave-past-hero");
      document.body.classList.remove("sidewave-hint-active");
      clearHint();
      window.removeEventListener("scroll", onScrollFade);
      window.removeEventListener("scroll", onScrollReengage);
      window.removeEventListener("scroll", onScrollForHint);
      window.removeEventListener("wheel", onWheelEscape, {
        capture: true,
      } as unknown as EventListenerOptions);
      window.removeEventListener("touchstart", onTouchStartTrack, {
        capture: true,
      } as unknown as EventListenerOptions);
      window.removeEventListener("touchmove", onTouchMoveEscape, {
        capture: true,
      } as unknown as EventListenerOptions);

      const w = window as unknown as {
        gameInstance?: { Quit?: () => Promise<void> };
      };
      try {
        w.gameInstance?.Quit?.();
      } catch {
        /* noop */
      }

      document.querySelectorAll(`[${TAG}]`).forEach((el) => el.remove());

      document.documentElement.style.height = "";
      document.body.style.height = "";
      links.forEach((l) => l.remove());
    };
  }, []);

  // The Scroll Down button now just smooth-scrolls *past* the hero zone into
  // the first React section. The hero stays mounted — the user can scroll
  // back up and the sticky canvas re-engages naturally.
  const handleSkip = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    const unityContainer = document.getElementById("unityContainer");
    const target =
      document.getElementById("architecture") ||
      document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (unityContainer) {
      const end = unityContainer.offsetTop + unityContainer.offsetHeight + 1;
      window.scrollTo({ top: end, behavior: "smooth" });
    }
    onSkip?.();
  };

  // originList items navigate to a real page section. stopPropagation prevents
  // scroll-visuals.js's .scroll-overlay-origin-list click handler from also
  // firing (which would toggle the originList collapse animation).
  const handleOriginListNav =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (href.startsWith("#")) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.location.href = href;
    };

  return (
    <div ref={rootRef} className="sidewave-host">
      {error && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black text-white p-8 text-center">
          <div>
            <h2 className="text-2xl mb-2">SideWave failed to load</h2>
            <p className="text-white/60 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* React-owned gate that masks the canvas + any of SideWave's own
          loader UIs until snapScroll is actually populated. SideWave hides
          its loader as soon as the Unity binary downloads, which leaves a
          4-5s blank window before the timeline initialises — this overlay
          covers that. */}
      {!unityReady && !error && (
        <div className="sidewave-gate">
          <img
            src={`${SIDEWAVE_BASE}/images/Mobius100.gif`}
            alt=""
            className="sidewave-gate-spinner"
          />
          <span className="sidewave-gate-label">Preparing the experience</span>
          <button
            type="button"
            onClick={switchToLite}
            className={`sidewave-lite-cta ${slowLoad ? "is-urgent" : ""}`}
          >
            {slowLoad ? "Taking too long? Use lite hero" : "Quick load → lite hero"}
          </button>
          <span className="sidewave-gate-sub">
            Skips the immersive 3D hero for a faster page.
          </span>
        </div>
      )}

      <div id="loopLoader">
        <img src={`${SIDEWAVE_BASE}/images/Mobius100.gif`} id="sphereGif" alt="" />
      </div>
      <div id="loopLoaderOverlay">
        <img
          src={`${SIDEWAVE_BASE}/images/Mobius100.gif`}
          alt=""
          style={{ width: 80, height: 80, marginBottom: 16 }}
        />
        <span>LOADING SIGNAL</span>
      </div>

      <div id="unityContainer" className="webgl-content unity-desktop">
        <div id="unityProgress" className="progress">
          <div className="empty"></div>
          <div id="unity-progress-bar-full" className="full"></div>
        </div>
        <div id="loadingMessages" className="hideAfterLoading">
          <span></span>
        </div>
        <canvas id="webContainer"></canvas>
      </div>

      <section className="sidewave-chrome">
        <button
          type="button"
          onClick={handleSkip}
          id="spaceNavigation"
          className="scrollToDiscover showAfterLoading"
          aria-label="Skip the intro and scroll to the next section"
        >
          Scroll Down
        </button>

        <div id="menuPanel" style={{ ["--default-bg" as never]: "none" }}></div>
      </section>

      {/* Scroll-driven timeline overlays.
          Frame counts here are SCROLLBAR positions, not Unity frame numbers.
          With the SendMessage remap, scrollY 0 == Unity frame 720, scrollY at
          end of hero zone == Unity frame 3500. The data-frame-count values
          below place each text overlay at the scrollY corresponding to the
          desired Unity frame:
              data-frame-count = (target_unity_frame - 720) / (3500 - 720) * 12767
          so each overlay lands when the corresponding Unity scene is in view. */}
      <main className="sidewave-main">
        <div
          className="lateralMenu scroll-overlay visible"
          data-frame-count="0"
          data-frame-range="12767"
        >
          <ul>
            <li>
              <div className="sceneName">POINT BLANK</div>
              <span>
                AI-based autonomous cybersecurity. Every finding shipped with proof.
              </span>
            </li>
            <li data-menutarget="desert" className="active">
              <a href="#desert">Hero</a>
            </li>
            <li data-menutarget="explore">
              <a href="#explore">Explore</a>
            </li>
          </ul>
        </div>

        {/* DESERT: headline arrives early on the desert scene */}
        <div className="scroll-overlay-text center scroll-pause" data-frame-count={dfc(1050)}>
          <h2 style={{ paddingBottom: "22vh" }}>
            SECURITY,<br />REDEFINED.
          </h2>
        </div>

        {/* DESERT: tagline lands as the camera pushes in */}
        <div
          className="scroll-overlay-text right mobile-space-around scroll-pause"
          data-frame-count={dfc(1500)}
        >
          <h2>SIGNAL OVER NOISE.</h2>
          <p style={{ paddingLeft: "50%" }}>
            AI accelerates. Experts verify. Every finding shipped with proof.
          </p>
        </div>

        {/* DESERT-to-WATER transition: brand promise */}
        <div className="scroll-overlay-text center scroll-pause" data-frame-count={dfc(1950)}>
          <p>
            Layer after layer, complexity distilled<br />into a single defensive loop.
          </p>
        </div>

        {/* WATER ORB / originList — the navigation portal */}
        <div
          id="explore"
          className="anchor lateralAnchor"
          data-frame-anchor={dfc(2160)}
        ></div>
        <div
          id="originList"
          className="scroll-overlay"
          data-frame-count={dfc(2160)}
          data-frame-range={String(
            Math.round(
              FALLBACK_TOTAL_FRAMES *
                (2880 - 2160) /
                (FRAME_END - FRAME_START)
            )
          )}
        >
          <ul>
            <li></li>
            <li></li>
            <li id="originListLabel0">OFFENSIVE</li>
            <li id="originListLabel1">DEFENSIVE</li>
            <li id="originListLabel2">GOVERNANCE</li>
            <li id="originListLabel3">INCIDENT</li>
            <li>OFFENSIVE</li>
            <li>DEFENSIVE</li>
          </ul>
          <div className="originClickToDiscover">Scroll to explore</div>
        </div>

        <div
          id="originList0"
          className="scroll-pause scroll-overlay-text scroll-overlay-origin-list"
          data-frame-count={dfc(2160)}
          data-visible-fn="ScrollOriginList"
          data-visible-params="[0]"
        >
          <p className="originSubText">
            Pressure-test the perimeter<br />and the assumptions behind it.
          </p>
          <div className="originListClick">
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>PENETRATION TESTING</a></span>
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>RED TEAMING</a></span>
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>APPLICATION SECURITY</a></span>
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>SOCIAL ENGINEERING</a></span>
          </div>
        </div>

        <div
          id="originList1"
          className="scroll-pause scroll-overlay-text scroll-overlay-origin-list"
          data-frame-count={dfc(2400)}
          data-visible-fn="ScrollOriginList"
          data-visible-params="[1]"
        >
          <p className="originSubText">
            See faster. Decide faster.<br />Contain faster.
          </p>
          <div className="originListClick">
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>SOC</a></span>
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>MANAGED DETECTION</a></span>
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>THREAT HUNTING</a></span>
            <span><a href="#outcomes" onClick={handleOriginListNav("#outcomes")}>RESPONSE</a></span>
          </div>
        </div>

        <div
          id="originList2"
          className="scroll-pause scroll-overlay-text scroll-overlay-origin-list"
          data-frame-count={dfc(2610)}
          data-visible-fn="ScrollOriginList"
          data-visible-params="[2]"
        >
          <p className="originSubText">
            Map controls to evidence.<br />Compliance, on autopilot.
          </p>
          <div className="originListClick">
            <span><a href="#proof" onClick={handleOriginListNav("#proof")}>vCISO</a></span>
            <span><a href="#proof" onClick={handleOriginListNav("#proof")}>POLICY MAPPING</a></span>
            <span><a href="#proof" onClick={handleOriginListNav("#proof")}>AUDIT EVIDENCE</a></span>
            <span><a href="#proof" onClick={handleOriginListNav("#proof")}>RISK SCORING</a></span>
          </div>
        </div>

        <div
          id="originList3"
          className="scroll-pause scroll-overlay-text scroll-overlay-origin-list"
          data-frame-count={dfc(2880)}
          data-visible-fn="ScrollOriginList"
          data-visible-params="[3]"
        >
          <p className="originSubText">
            From first signal to full closure,<br />with proof at every step.
          </p>
          <div className="originListClick">
            <span><a href="/services/data-breach-response" onClick={handleOriginListNav("/services/data-breach-response")}>BREACH RESPONSE</a></span>
            <span><a href="/services/data-breach-response" onClick={handleOriginListNav("/services/data-breach-response")}>DIGITAL FORENSICS</a></span>
            <span><a href="/services/data-breach-response" onClick={handleOriginListNav("/services/data-breach-response")}>RECOVERY</a></span>
            <span><a href="/services/data-breach-response" onClick={handleOriginListNav("/services/data-breach-response")}>REPORTING</a></span>
          </div>
        </div>

        {/* Closing beat lands as user reaches the bottom of the hero zone */}
        <div
          className="scroll-overlay-text center scroll-pause"
          data-frame-count={dfc(FRAME_END - 50)}
        >
          <h2>
            ENGINEERED FOR PROOF.<br />BUILT FOR SPEED.
          </h2>
        </div>
      </main>

      <div id="desert" className="anchor" data-frame-anchor="0"></div>
      <div id="origin" className="anchor" data-frame-anchor="0"></div>

      <div
        className={`sidewave-cta-overlay showAfterLoading ${loaded ? "is-ready" : ""}`}
      >
        <a href="#categories" className="sidewave-cta-primary group">
          Explore Services
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a href="#contact" className="sidewave-cta-secondary">
          Book Review
        </a>
      </div>
    </div>
  );
};

export default SidewaveHero;
