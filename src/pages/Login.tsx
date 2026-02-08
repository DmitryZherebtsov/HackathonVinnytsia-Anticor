import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <div className="inline-block">
              <Logo size="lg" />
            </div>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Вхід до платформи
            </h1>
            <p className="text-muted-foreground">
              Увійдіть, щоб продовжити роботу
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Забули пароль?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Введіть пароль"
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

            <Button type="submit" size="lg" className="w-full h-12">
              Увійти
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Немає акаунту?{" "}
              <Link to="/register" className="text-accent hover:underline">
                Зареєструватися
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
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
  );
};

export default Login;
