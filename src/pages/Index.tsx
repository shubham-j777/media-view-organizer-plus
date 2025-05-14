import { MediaProvider } from "@/contexts/MediaContext";
import MediaTable from "@/components/MediaTable/MediaTable";
import MediaTableToolbar from "@/components/MediaTable/MediaTableToolbar";
import Layout from "@/components/Layout/Layout";
import { useState } from "react";

const Index = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  const toggleSidebar = () => setSidebarExpanded(prev => !prev);
  
  return (
    <MediaProvider>
      <Layout sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}>
        <div className="px-4 md:px-6">
          <MediaTableToolbar onSidebarToggle={toggleSidebar} />
          <MediaTable />
        </div>
      </Layout>
    </MediaProvider>
  );
};

export default Index;
