import { Lock, User } from "lucide-react";

interface TrustBadgeProps {
  mode: "anonymous" | "registered";
}

const TrustBadge = ({ mode }: TrustBadgeProps) => {
  if (mode === "anonymous") {
    return (
      <div className="trust-badge trust-badge-anonymous">
        <Lock size={12} />
        <span>Анонімно</span>
      </div>
    );
  }

  return (
    <div className="trust-badge trust-badge-registered">
      <User size={12} />
      <span>Зареєстрований</span>
    </div>
  );
};

export default TrustBadge;
