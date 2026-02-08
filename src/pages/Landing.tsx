import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import TrustIndicator from "@/components/TrustIndicator";
import { ArrowRight, UserPlus, LogIn, EyeOff } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <Logo size="md" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Text */}
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Платформа для збору, аналізу та{" "}
                <span className="text-gradient-primary">розслідування корупції</span>{" "}
                в Україні
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Від громадян — для громадян. Анонімно або з акаунтом.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 py-6"
                onClick={() => navigate("/register")}
              >
                <UserPlus size={20} className="mr-2" />
                Зареєструватися
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 py-6"
                onClick={() => navigate("/login")}
              >
                <LogIn size={20} className="mr-2" />
                Увійти
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 py-6 text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/dashboard")}
              >
                <EyeOff size={20} className="mr-2" />
                Увійти анонімно
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <TrustIndicator
                icon="eye"
                title="Ми не зберігаємо особисті дані"
                description="Приватність — наш пріоритет"
              />
              <TrustIndicator
                icon="shield"
                title="Анонімний режим"
                description="Без реєстрації та ідентифікації"
              />
              <TrustIndicator
                icon="database"
                title="Лише для аналізу"
                description="Дані використовуються етично"
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-6 py-6 border-t border-border/50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 АНТИКОР. Громадська ініціатива.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Про проєкт</a>
              <a href="#" className="hover:text-foreground transition-colors">Приватність</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакти</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
