import { Shield } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    md: { icon: 28, text: "text-2xl" },
    lg: { icon: 40, text: "text-4xl" },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Shield 
          size={sizes[size].icon} 
          className="text-primary fill-primary/20" 
          strokeWidth={2}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
      {showText && (
        <span className={`font-bold tracking-wide ${sizes[size].text}`}>
          <span className="text-foreground">АНТИ</span>
          <span className="text-primary">КОР</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
