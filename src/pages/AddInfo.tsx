import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Send, 
  Paperclip, 
  X, 
  FileText, 
  Image, 
  Video,
  Check
} from "lucide-react";

const categories = [
  { id: "roads", label: "Дорожнє будівництво" },
  { id: "energy", label: "Енергетика" },
  { id: "medicine", label: "Медицина" },
  { id: "education", label: "Освіта" },
  { id: "procurement", label: "Державні закупівлі" },
  { id: "other", label: "Інше" },
];

interface ChatMessage {
  id: string;
  type: "system" | "user";
  content: string;
}

const AddInfo = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [findLikeMinded, setFindLikeMinded] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "system",
      content: "Опишіть ситуацію, яку ви вважаєте корупційною. Ви можете прикріпити документи, фото або відео як докази.",
    },
  ]);

  const isAnonymous = true;

  const handleSendMessage = () => {
    if (!message.trim() && files.length === 0) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message + (files.length > 0 ? ` [${files.length} файл(ів) прикріплено]` : ""),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate system response
    setTimeout(() => {
      const systemResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: "Дякуємо за інформацію! Оберіть категорію корупції та натисніть «Надіслати» для завершення.",
      };
      setMessages((prev) => [...prev, systemResponse]);
    }, 1000);
  };

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov";
    input.onchange = (e) => {
      const selectedFiles = (e.target as HTMLInputElement).files;
      if (selectedFiles) {
        setFiles([...files, ...Array.from(selectedFiles)]);
      }
    };
    input.click();
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return Image;
    if (file.type.startsWith("video/")) return Video;
    return FileText;
  };

  const handleSubmit = () => {
    // Handle submission
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAnonymous={isAnonymous} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Додати інформацію
          </h1>
          <p className="text-muted-foreground">
            Розкажіть про випадок корупції, який ви спостерігали
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto min-h-[300px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble ${
                  msg.type === "user" ? "chat-bubble-user" : "chat-bubble-system"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Files Preview */}
          {files.length > 0 && (
            <div className="px-6 py-3 border-t border-border bg-secondary/30">
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => {
                  const Icon = getFileIcon(file);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm"
                    >
                      <Icon size={16} className="text-muted-foreground" />
                      <span className="max-w-[150px] truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-end gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFileSelect}
                className="flex-shrink-0"
              >
                <Paperclip size={18} />
              </Button>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опишіть ситуацію..."
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!message.trim() && files.length === 0}
                className="flex-shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Оберіть категорію
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedCategory === category.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category.label}</span>
                  {selectedCategory === category.id && (
                    <Check size={18} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Find Like-minded */}
        <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-start gap-3">
            <Checkbox
              id="findLikeMinded"
              checked={findLikeMinded}
              onCheckedChange={(checked) => setFindLikeMinded(checked as boolean)}
              disabled={isAnonymous}
              className="mt-1"
            />
            <div>
              <Label
                htmlFor="findLikeMinded"
                className={isAnonymous ? "text-muted-foreground" : "text-foreground"}
              >
                Знайти однодумців
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {isAnonymous
                  ? "Доступно лише для зареєстрованих користувачів"
                  : "Ваш профіль буде показано іншим користувачам у схожих кейсах"}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <Button
            size="lg"
            className="w-full h-14 text-lg"
            onClick={handleSubmit}
            disabled={!selectedCategory || messages.length < 2}
          >
            Надіслати інформацію
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AddInfo;
