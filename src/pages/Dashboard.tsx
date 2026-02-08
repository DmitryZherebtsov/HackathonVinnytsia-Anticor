import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import { PlusCircle, Search, HandHelping } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAnonymous = true;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAnonymous={isAnonymous} />

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Що ви хочете зробити?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Оберіть одну з можливостей платформи для початку роботи
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={PlusCircle}
              title="Додати інформацію"
              description="Повідомте про корупцію, яку ви помітили. Додайте документи, фото або відео як докази."
              ctaText="Додати"
              variant="primary"
              onClick={() => navigate("/add-info")}
            />
            
            <FeatureCard
              icon={Search}
              title="Знайти інформацію"
              description="Шукайте за суб'єктами, категоріями або використовуйте AI для аналітичного розслідування."
              ctaText="Шукати"
              variant="accent"
              onClick={() => navigate("/search")}
            />
            
            <FeatureCard
              icon={HandHelping}
              title="Волонтерство"
              description="Допоможіть проєкту своїми навичками: аналітика, юриспруденція, OSINT, ML та інше."
              ctaText="Долучитися"
              onClick={() => navigate("/volunteer")}
            />
          </div>

          {/* Anonymous Mode Notice */}
          {isAnonymous && (
            <div className="mt-12 p-6 rounded-xl bg-secondary/50 border border-border text-center">
              <p className="text-muted-foreground mb-3">
                Ви працюєте в <strong className="text-foreground">анонімному режимі</strong>. 
                Деякі функції недоступні без реєстрації.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/register")}>
                Створити акаунт для повного доступу
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>АНТИКОР © 2024 · Громадська ініціатива</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
