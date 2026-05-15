"use client";

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollButton({ targetId, className, children }: ScrollButtonProps) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
