import { ShieldCheck, EyeOff, Database } from "lucide-react";

interface TrustIndicatorProps {
  icon: "shield" | "eye" | "database";
  title: string;
  description: string;
}

const TrustIndicator = ({ icon, title, description }: TrustIndicatorProps) => {
  const icons = {
    shield: ShieldCheck,
    eye: EyeOff,
    database: Database,
  };

  const Icon = icons[icon];

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
        <Icon size={20} className="text-success" />
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-0.5">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default TrustIndicator;
