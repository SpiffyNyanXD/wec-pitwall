export default function WecLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`w-10 h-10 rounded-lg racing-gradient flex items-center justify-center shadow-lg ${className}`}>
      <span className="font-racing text-lg font-bold text-primary-foreground">W</span>
    </div>
  );
}
