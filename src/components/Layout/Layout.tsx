import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  sidebarExpanded?: boolean;
  setSidebarExpanded?: Dispatch<SetStateAction<boolean>>;
}

const Layout = ({ 
  children, 
  sidebarExpanded: propSidebarExpanded, 
  setSidebarExpanded: propSetSidebarExpanded 
}: LayoutProps) => {
  const [localSidebarExpanded, setLocalSidebarExpanded] = useState(false);
  
  // Use props if provided, otherwise use local state
  const sidebarExpanded = propSidebarExpanded !== undefined ? propSidebarExpanded : localSidebarExpanded;
  const setSidebarExpanded = propSetSidebarExpanded || setLocalSidebarExpanded;

  return (
    <div className="flex min-h-screen">
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <main 
        className={cn(
          "flex-1 w-full will-change-[padding]",
          sidebarExpanded ? "lg:pl-80" : "lg:pl-16",
          "transition-[padding] duration-150"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout; 