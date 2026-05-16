import { Sun, Moon } from "lucide-react";

export type HeroMode = "sidewave" | "light";

interface Props {
  mode: HeroMode;
  onToggle: (next: HeroMode) => void;
}

const HeroModeToggle = ({ mode, onToggle }: Props) => {
  const isLight = mode === "light";
  const next: HeroMode = isLight ? "sidewave" : "light";

  return (
    <button
      type="button"
      onClick={() => onToggle(next)}
      className={`hero-mode-toggle ${isLight ? "is-light" : ""}`}
      aria-label={
        isLight
          ? "Switch to immersive SideWave hero"
          : "Switch to light, faster hero"
      }
      title={
        isLight
          ? "Switch to immersive SideWave hero"
          : "Switch to light, faster hero"
      }
    >
      <span className="dot" />
      {isLight ? (
        <>
          <Sun className="h-3.5 w-3.5" /> Light hero
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5" /> Immersive hero
        </>
      )}
    </button>
  );
};

export default HeroModeToggle;
