
import { useMedia } from "@/contexts/MediaContext";
import SearchInput from "./SearchInput";
import ColumnToggle from "./ColumnToggle";
import AddMediaDialog from "./AddMediaDialog";

const MediaTableToolbar = () => {
  const { mediaList, searchTerm } = useMedia();
  
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Media Collection</h1>
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
  );
};

export default MediaTableToolbar;
