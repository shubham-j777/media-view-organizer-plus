import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Film, 
  Tv, 
  LayoutList, 
  Sparkles,
  Menu,
  ChevronRight,
  Settings
} from "lucide-react";
import { MediaCategory, useMedia } from "@/contexts/MediaContext";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import LogoImage from "@/assets/logo";
import React from "react";

interface SidebarProps {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const { selectedCategory, setSelectedCategory } = useMedia();
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if it's a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is typically 1024px
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle Escape key to collapse sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) {
        setExpanded(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expanded, setExpanded]);

  // Handle clicking outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (expanded && isMobile && !target.closest('[data-sidebar="true"]')) {
        setExpanded(false);
      }
    };
    
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [expanded, setExpanded, isMobile]);

  return (
    <>
      {/* Overlay for mobile */}
      {expanded && isMobile && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setExpanded(false)}
        />
      )}
      
      <aside
        data-sidebar="true"
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-black flex flex-col will-change-transform",
          expanded ? "w-80" : "w-16",
          isMobile && !expanded && "-translate-x-full",
          isMobile && expanded && "translate-x-0 w-80",
          "lg:fixed lg:translate-x-0",
          "transition-[width] duration-150"
        )}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        {/* Hamburger button for collapsed state */}
        {!expanded && (
          <div className="p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white"
              onClick={() => setExpanded(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Logo and toolbar area */}
        {expanded && (
          <div className="p-6 flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <div className="w-full h-auto overflow-hidden" style={{ maxWidth: "280px" }}>
                <LogoImage />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-0 left-0 h-8 w-8 text-white"
                onClick={() => setExpanded(false)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="mt-2 flex-1">
          {expanded ? (
            <nav className="flex flex-col">
              <SidebarNavItem 
                label="Anime" 
                isActive={selectedCategory === "anime"} 
                onClick={() => setSelectedCategory("anime")} 
              />
              <SidebarNavItem 
                label="Movies" 
                isActive={selectedCategory === "movie"} 
                onClick={() => setSelectedCategory("movie")} 
              />
              <SidebarNavItem 
                label="Web Series" 
                isActive={selectedCategory === "webseries"} 
                onClick={() => setSelectedCategory("webseries")} 
              />
            </nav>
          ) : (
            <nav className="flex flex-col items-center pt-4 space-y-4">
              <IconButton
                icon={<Sparkles />}
                isActive={selectedCategory === "anime"}
                onClick={() => setSelectedCategory("anime")}
                tooltip="Anime"
                showTooltip={isHovering}
              />
              <IconButton
                icon={<Film />}
                isActive={selectedCategory === "movie"}
                onClick={() => setSelectedCategory("movie")}
                tooltip="Movies"
                showTooltip={isHovering}
              />
              <IconButton
                icon={<Tv />}
                isActive={selectedCategory === "webseries"}
                onClick={() => setSelectedCategory("webseries")}
                tooltip="Web Series"
                showTooltip={isHovering}
              />
            </nav>
          )}
        </div>
        
        {/* Settings at bottom */}
        <div className="mt-auto">
          {expanded ? (
            <button
              onClick={() => {}}
              className="w-full flex items-center px-6 py-3 text-white hover:bg-gray-900 transition-colors duration-100"
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3" />
                <span className="text-base">Settings</span>
              </div>
            </button>
          ) : (
            <div className="pb-4 flex justify-center">
              <IconButton
                icon={<Settings />}
                isActive={false}
                onClick={() => {}}
                tooltip="Settings"
                showTooltip={isHovering}
              />
            </div>
          )}
        </div>
        
      </aside>
      
      {/* Mobile toggle button */}
      {isMobile && !expanded && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-md lg:hidden"
          onClick={() => setExpanded(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

interface SidebarNavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarNavItem = ({ 
  label, 
  isActive, 
  onClick
}: SidebarNavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-6 py-3 text-lg text-white",
        isActive 
          ? "bg-gray-800" 
          : "hover:bg-gray-900",
        "transition-colors duration-100"
      )}
    >
      <span>{label}</span>
      <ChevronRight className="h-5 w-5" />
    </button>
  );
};

interface IconButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  tooltip: string;
  showTooltip: boolean;
}

const IconButton = ({ 
  icon, 
  isActive, 
  onClick,
  tooltip,
  showTooltip
}: IconButtonProps) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-md text-white",
          isActive 
            ? "bg-gray-800" 
            : "hover:bg-gray-900",
          "transition-colors duration-100"
        )}
      >
        {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
      </button>
      
      {showTooltip && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md whitespace-nowrap z-50 animate-in fade-in-50 duration-100">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Sidebar; 