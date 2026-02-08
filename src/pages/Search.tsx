import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search as SearchIcon,
  User,
  Building2,
  FolderOpen,
  Sparkles,
  MapPin,
  Calendar,
  Plus,
} from "lucide-react";

const regions = [
  "Київська область",
  "Львівська область",
  "Одеська область",
  "Харківська область",
  "Дніпропетровська область",
  "Запорізька область",
  "Вінницька область",
];

const categories = [
  "Дорожнє будівництво",
  "Енергетика",
  "Медицина",
  "Освіта",
  "Державні закупівлі",
];

interface Post {
  id: string;
  description: string;
  category: string;
  subject: string;
  location: string;
  date: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    description: "Нецільове використання коштів на ремонт дороги М-05. Роботи виконані лише частково, але оплата здійснена в повному обсязі.",
    category: "Дорожнє будівництво",
    subject: "Укравтодор",
    location: "Київська область",
    date: "2024-01-15",
  },
  {
    id: "2",
    description: "Закупівля медичного обладнання за завищеними цінами. Різниця з ринковими цінами складає 40%.",
    category: "Медицина",
    subject: "Обласна лікарня",
    location: "Харківська область",
    date: "2024-01-10",
  },
  {
    id: "3",
    description: "Фіктивні тендери на постачання продуктів харчування до шкіл. Всі контракти отримує одна компанія.",
    category: "Державні закупівлі",
    subject: "Управління освіти",
    location: "Одеська область",
    date: "2024-01-08",
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("subject");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [useAI, setUseAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedForAI, setSelectedForAI] = useState<string[]>([]);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const isAnonymous = true;

  const handleSearch = () => {
    setResults(mockPosts);
    setShowResults(true);
    setAiReport(null);
    setSelectedForAI([]);
  };

  const togglePostForAI = (postId: string) => {
    setSelectedForAI((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const generateAIReport = () => {
    setAiReport(`
## Аналітичний звіт AI

### Використані джерела
- 3 публікації користувачів платформи
- Відкриті реєстри державних закупівель
- Публічні фінансові звіти

### Виявлені невідповідності
1. **Завищення цін на 35-45%** порівняно з середньоринковими показниками
2. **Повторювані підрядники** — одні й ті ж компанії отримують контракти в різних регіонах
3. **Неповна документація** — відсутні акти виконаних робіт у 60% випадків

### Факти, що не сходяться
- Заявлений обсяг робіт не відповідає фактичним результатам
- Терміни виконання робіт нереалістично короткі
- Зв'язок між замовниками та виконавцями через спільних бенефіціарів

### Найбільш імовірне пояснення
Схема систематичного розкрадання бюджетних коштів через мережу пов'язаних компаній із залученням посадовців органів місцевого самоврядування.
    `);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAnonymous={isAnonymous} />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Знайти інформацію
          </h1>
          <p className="text-muted-foreground">
            Шукайте за суб'єктами, категоріями або використовуйте AI-аналітику
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          {/* Search Type Tabs */}
          <Tabs value={searchType} onValueChange={setSearchType} className="mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="subject" className="flex items-center gap-2">
                <User size={16} />
                Суб'єкт
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2">
                <FolderOpen size={16} />
                Категорія
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Sparkles size={16} />
                AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subject" className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label>Назва суб'єкта (персона або компанія)</Label>
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Введіть назву..."
                    className="mt-2 h-12"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="category" className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label>Оберіть категорію</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-2 h-12">
                      <SelectValue placeholder="Оберіть категорію" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        AI-розслідування
                      </p>
                      <p className="text-sm text-muted-foreground">
                        AI аналізує пости, відкриті джерела та логічні невідповідності
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Що саме потрібно дослідити?</Label>
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Опишіть, що саме потрібно проаналізувати..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-muted-foreground" />
                Локація
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть регіон" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((reg) => (
                    <SelectItem key={reg} value={reg}>
                      {reg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-muted-foreground" />
                Період від
              </Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-muted-foreground" />
                Період до
              </Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          {/* AI Toggle for non-AI tabs */}
          {searchType !== "ai" && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Switch
                  checked={useAI}
                  onCheckedChange={setUseAI}
                />
                <Label className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  Використати AI-розслідування
                </Label>
              </div>
            </div>
          )}

          {/* Search Button */}
          <Button
            size="lg"
            className="w-full mt-6 h-12"
            onClick={handleSearch}
          >
            <SearchIcon size={18} className="mr-2" />
            Знайти та проаналізувати
          </Button>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            {/* Posts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Пости користувачів
                </h2>
                <span className="text-sm text-muted-foreground">
                  Знайдено: {results.length}
                </span>
              </div>

              <div className="space-y-4">
                {results.map((post) => (
                  <div
                    key={post.id}
                    className={`p-5 rounded-xl border transition-all ${
                      selectedForAI.includes(post.id)
                        ? "border-accent bg-accent/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <p className="text-foreground mb-4">{post.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span className="px-2 py-1 rounded bg-secondary">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 size={14} />
                        {post.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {post.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                    </div>

                    <Button
                      variant={selectedForAI.includes(post.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePostForAI(post.id)}
                    >
                      <Plus size={14} className="mr-1" />
                      {selectedForAI.includes(post.id)
                        ? "Додано до AI-аналізу"
                        : "Додати до AI-аналізу"}
                    </Button>
                  </div>
                ))}
              </div>

              {selectedForAI.length > 0 && !aiReport && (
                <Button
                  size="lg"
                  className="w-full mt-6"
                  onClick={generateAIReport}
                >
                  <Sparkles size={18} className="mr-2" />
                  Згенерувати AI-звіт ({selectedForAI.length} постів)
                </Button>
              )}
            </div>

            {/* AI Report */}
            {aiReport && (
              <div className="bg-card border border-accent/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={20} className="text-accent" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Аналітичний звіт AI
                  </h2>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-muted-foreground">
                    {aiReport}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
