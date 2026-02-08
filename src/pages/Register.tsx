import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const benefits = [
    "Пошук однодумців серед учасників",
    "Видимість профілю в кейсах",
    "Збереження історії звернень",
    "Доступ до розширеної аналітики",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard after registration
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col px-6 py-8 lg:px-12">
        <div className="mb-8">
          <Link to="/">
            <Logo size="sm" />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Створити акаунт
              </h1>
              <p className="text-muted-foreground">
                Приєднуйтесь до спільноти громадських розслідувачів
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Мінімум 8 символів"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  Я погоджуюсь з{" "}
                  <a href="#" className="text-accent hover:underline">
                    правилами користування
                  </a>{" "}
                  та{" "}
                  <a href="#" className="text-accent hover:underline">
                    політикою приватності
                  </a>
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full h-12">
                Створити акаунт
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Вже маєте акаунт?{" "}
                <Link to="/login" className="text-accent hover:underline">
                  Увійти
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link 
                to="/dashboard" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <EyeOff size={16} />
                Увійти анонімно без реєстрації
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Benefits */}
      <div className="hidden lg:flex flex-1 bg-card border-l border-border items-center justify-center p-12">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Переваги акаунту
          </h2>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                  <Check size={14} className="text-success" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-secondary/50 border border-border/50">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Примітка:</strong> Ви можете користуватися платформою анонімно без реєстрації. 
              Акаунт потрібен лише для додаткових можливостей.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
