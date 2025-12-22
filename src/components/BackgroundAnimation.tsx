const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(245,43,67,0.18),transparent_34%),radial-gradient(circle_at_18%_70%,rgba(98,11,18,0.34),transparent_38%)]" />
      <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(245,43,67,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(245,43,67,0.1)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(180deg,rgba(208,32,48,0.16),transparent_70%)]" />
    </div>
  );
};

export default BackgroundAnimation;
