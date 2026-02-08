import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import TrustBadge from "@/components/TrustBadge";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Search, 
  HandHelping, 
  LayoutDashboard, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isAnonymous?: boolean;
  showBackButton?: boolean;
}

const navItems = [
  { to: "/dashboard", label: "Головна", icon: LayoutDashboard },
  { to: "/add-info", label: "Додати", icon: PlusCircle },
  { to: "/search", label: "Пошук", icon: Search },
  { to: "/volunteer", label: "Волонтерство", icon: HandHelping },
];

const Header = ({ isAnonymous = true, showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === "/" || 
                        location.pathname === "/login" || 
                        location.pathname === "/register";

  return (
    <header className="w-full px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </button>
          
          {/* Desktop Navigation */}
          {!isLandingPage && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  activeClassName="text-primary bg-primary/10 hover:bg-primary/15"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {!isLandingPage && (
            <>
              <TrustBadge mode={isAnonymous ? "anonymous" : "registered"} />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="hidden md:flex text-muted-foreground hover:text-foreground"
              >
                <LogOut size={18} className="mr-2" />
                Вийти
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {!isLandingPage && mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                activeClassName="text-primary bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <LogOut size={18} className="mr-3" />
                Вийти
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
