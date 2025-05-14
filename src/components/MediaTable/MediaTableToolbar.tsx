import { useMedia } from "@/contexts/MediaContext";
import SearchInput from "./SearchInput";
import ColumnToggle from "./ColumnToggle";
import AddMediaDialog from "./AddMediaDialog";

interface MediaTableToolbarProps {
  onSidebarToggle?: () => void;
}

const MediaTableToolbar = ({ onSidebarToggle }: MediaTableToolbarProps = {}) => {
  const { mediaList, searchTerm } = useMedia();
  
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-2">
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Track Waltz</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {mediaList.length} {mediaList.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full max-w-sm">
            <SearchInput />
          </div>
          <div className="flex items-center gap-2">
            <ColumnToggle />
            <AddMediaDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaTableToolbar;
