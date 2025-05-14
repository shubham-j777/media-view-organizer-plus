
import { useEffect, useMemo } from "react";
import { useMedia } from "@/contexts/MediaContext";
import { Media } from "@/types/media";
import MediaRow from "./MediaRow";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const MediaTable = () => {
  const { 
    mediaList, 
    searchTerm, 
    visibleColumns,
    sortConfig,
    setSortConfig
  } = useMedia();

  // Filter media list based on search term
  const filteredMedia = useMemo(() => {
    return mediaList.filter(media => 
      media.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mediaList, searchTerm]);

  // Sort media list
  const sortedMedia = useMemo(() => {
    if (!sortConfig.key) return filteredMedia;
    
    return [...filteredMedia].sort((a, b) => {
      if (a[sortConfig.key] === null) return 1;
      if (b[sortConfig.key] === null) return -1;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredMedia, sortConfig]);

  const handleSort = (key: keyof Media) => {
    setSortConfig(currentConfig => {
      if (currentConfig.key === key) {
        return {
          key,
          direction: currentConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Media }) => {
    if (sortConfig.key !== columnKey) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-secondary/30">
          <tr>
            <th 
              className="p-2 text-center column-header whitespace-nowrap" 
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center justify-center">
                #
                <SortIcon columnKey="id" />
              </div>
            </th>
            
            {visibleColumns.image && (
              <th className="p-2 column-header">
                Image
              </th>
            )}
            
            {visibleColumns.title && (
              <th 
                className="p-2 text-left column-header" 
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center">
                  Title
                  <SortIcon columnKey="title" />
                </div>
              </th>
            )}
            
            {visibleColumns.rating && (
              <th 
                className="p-2 column-header" 
                onClick={() => handleSort("rating")}
              >
                <div className="flex items-center">
                  Rating
                  <SortIcon columnKey="rating" />
                </div>
              </th>
            )}
            
            {visibleColumns.notes && (
              <th className="p-2 text-left column-header">
                Notes
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedMedia.length > 0 ? (
            sortedMedia.map((media, index) => (
              <MediaRow 
                key={media.id} 
                media={media} 
                index={index}
              />
            ))
          ) : (
            <tr>
              <td 
                colSpan={5} 
                className="py-4 text-center text-muted-foreground"
              >
                {searchTerm 
                  ? "No media found matching your search." 
                  : "No media added yet. Add some media to get started!"
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MediaTable;
