import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  Users,
  Briefcase,
  Code,
  Scale,
  Search,
  BarChart3,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  icon: React.ElementType;
}

const volunteerTasks: Task[] = [
  {
    id: "ml",
    title: "Оптимізація ML-моделей",
    description: "Допомога з розробкою та оптимізацією моделей машинного навчання для аналізу документів та виявлення аномалій.",
    requirements: ["Python", "TensorFlow/PyTorch", "Досвід з NLP"],
    icon: Code,
  },
  {
    id: "data",
    title: "Аналіз даних",
    description: "Обробка та аналіз великих масивів даних про державні закупівлі, фінансові транзакції та корпоративні зв'язки.",
    requirements: ["SQL", "Pandas", "Візуалізація даних"],
    icon: BarChart3,
  },
  {
    id: "legal",
    title: "Юридична експертиза",
    description: "Правовий аналіз виявлених порушень, консультації щодо законодавства та підготовка юридичних висновків.",
    requirements: ["Юридична освіта", "Знання антикорупційного законодавства"],
    icon: Scale,
  },
  {
    id: "osint",
    title: "OSINT-дослідження",
    description: "Пошук та верифікація інформації з відкритих джерел, аналіз соціальних мереж та корпоративних реєстрів.",
    requirements: ["Досвід OSINT", "Аналітичне мислення", "Увага до деталей"],
    icon: Search,
  },
];

const Volunteer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("apply");
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    experience: "",
    contacts: "",
  });
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const isAnonymous = true;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate("/dashboard");
  };

  const handleTaskApply = (taskId: string) => {
    setSelectedTask(taskId);
    setActiveTab("apply");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAnonymous={isAnonymous} />

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Волонтерство / Допомога
          </h1>
          <p className="text-muted-foreground">
            Допоможіть проєкту своїми знаннями та навичками
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
            <TabsTrigger value="apply" className="flex items-center gap-2">
              <Users size={16} />
              Подати заявку
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Briefcase size={16} />
              Актуальні потреби
            </TabsTrigger>
          </TabsList>

          {/* Apply Form */}
          <TabsContent value="apply">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Заявка на волонтерство
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Хто ви</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше ім'я або нікнейм"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">Що ви вмієте</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Опишіть ваші навички та спеціалізацію"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Досвід</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Розкажіть про ваш досвід у відповідній сфері"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contacts">
                    Контакти{" "}
                    <span className="text-muted-foreground font-normal">
                      (опційно)
                    </span>
                  </Label>
                  <Input
                    id="contacts"
                    name="contacts"
                    value={formData.contacts}
                    onChange={handleInputChange}
                    placeholder="Email, Telegram або інші контакти"
                    className="h-12"
                  />
                </div>

                {selectedTask && (
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm text-accent">
                      Ви подаєте заявку на:{" "}
                      <strong>
                        {volunteerTasks.find((t) => t.id === selectedTask)?.title}
                      </strong>
                    </p>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full h-12">
                  <Send size={18} className="mr-2" />
                  Подати заявку
                </Button>
              </form>
            </div>
          </TabsContent>

          {/* Tasks List */}
          <TabsContent value="tasks">
            <div className="space-y-4">
              {volunteerTasks.map((task) => {
                const Icon = task.icon;
                return (
                  <div
                    key={task.id}
                    className="bg-card border border-border rounded-xl p-6 hover:border-muted-foreground transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {task.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {task.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {task.requirements.map((req, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full bg-secondary text-sm text-secondary-foreground"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleTaskApply(task.id)}
                        >
                          Подати заявку
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Volunteer;
