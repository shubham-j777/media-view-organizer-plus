
import { MediaProvider } from "@/contexts/MediaContext";
import MediaTable from "@/components/MediaTable/MediaTable";
import MediaTableToolbar from "@/components/MediaTable/MediaTableToolbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MediaProvider>
          <MediaTableToolbar />
          <MediaTable />
        </MediaProvider>
      </div>
    </div>
  );
};

export default Index;
