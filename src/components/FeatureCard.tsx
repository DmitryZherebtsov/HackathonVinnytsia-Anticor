import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "accent";
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  ctaText, 
  onClick,
  variant = "default" 
}: FeatureCardProps) => {
  const iconColors = {
    default: "text-muted-foreground",
    primary: "text-primary",
    accent: "text-accent",
  };

  const iconBgColors = {
    default: "bg-muted",
    primary: "bg-primary/10",
    accent: "bg-accent/10",
  };

  return (
    <div className="feature-card group p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/30">
      <div className={`w-14 h-14 rounded-xl ${iconBgColors[variant]} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={28} className={iconColors[variant]} />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      
      <Button 
        onClick={onClick}
        variant={variant === "primary" ? "default" : "outline"}
        className="group/btn"
      >
        {ctaText}
        <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </div>
  );
};

export default FeatureCard;
