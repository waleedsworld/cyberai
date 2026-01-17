type PointBlankLogoProps = {
  subtitle?: string;
  nameClassName?: string;
  subtitleClassName?: string;
  markClassName?: string;
};

const PointBlankLogo = ({
  subtitle = "AI Security & Compliance",
  nameClassName = "text-[20px] font-semibold tracking-tight text-white",
  subtitleClassName = "mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45",
  markClassName = "h-9 w-auto",
}: PointBlankLogoProps) => {
  return (
    <>
      <img src="/pointblank/pointblank-mark.svg" alt="PointBlank logo" className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className={nameClassName}>PointBlank</span>
        <span className={subtitleClassName}>{subtitle}</span>
      </span>
    </>
  );
};

export default PointBlankLogo;
