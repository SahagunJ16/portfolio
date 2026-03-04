interface MarqueeProps {
  children: React.ReactNode;
  duration?: string;
}

export default function Marquee({ children, duration = "15s" }: MarqueeProps) {
  return (
    <div className="group overflow-hidden whitespace-nowrap">
      <div
        className="inline-block animate-[var(--animate-marquee)] group-hover:[animation-play-state:paused]"
        style={{ animationDuration: duration }}
      >
        {children}
      </div>
    </div>
  );
}
