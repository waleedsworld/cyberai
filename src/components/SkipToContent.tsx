/**
 * Keyboard-accessibility skip link. Visually hidden until focused, then it
 * appears at the top-left so keyboard/screen-reader users can jump straight
 * to the main content, bypassing the fixed header and mega-nav. Targets the
 * element with id="main-content".
 */
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#d02030] focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-white focus:shadow-[0_0_24px_rgba(208,32,48,0.5)] focus:outline-none focus:ring-2 focus:ring-white/70"
  >
    Skip to main content
  </a>
);

export default SkipToContent;
