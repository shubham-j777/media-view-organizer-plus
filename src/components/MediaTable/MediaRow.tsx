
import React, { useState } from "react";
import { Media } from "@/types/media";
import { useMedia } from "@/contexts/MediaContext";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import MediaRating from "./MediaRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MediaRowProps {
  media: Media;
  index: number;
}

const MediaRow: React.FC<MediaRowProps> = ({ media, index }) => {
  const { expandedMediaId, setExpandedMediaId, updateMedia, visibleColumns } = useMedia();
  const isExpanded = expandedMediaId === media.id;
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(media.notes);

  const handleRowClick = () => {
    setExpandedMediaId(isExpanded ? null : media.id);
  };

  const handleNotesEdit = () => {
    setEditingNotes(true);
  };

  const handleNotesSave = () => {
    updateMedia(media.id, { notes });
    setEditingNotes(false);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "anime":
        return "bg-media-anime hover:bg-media-anime/80";
      case "movie":
        return "bg-media-movie hover:bg-media-movie/80";
      case "series":
        return "bg-media-series hover:bg-media-series/80";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <>
      <tr 
        className={cn(
          "media-row transition-all", 
          isExpanded && "expanded"
        )}
        onClick={handleRowClick}
      >
        <td className="p-2 text-center">{index + 1}</td>
        
        {visibleColumns.image && (
          <td className="p-2">
            <img 
              src={media.imageUrl} 
              alt={media.title}
              className="w-16 h-24 object-cover rounded"
            />
          </td>
        )}
        
        {visibleColumns.title && (
          <td className="p-2 font-medium">
            <div className="flex flex-col gap-1">
              <span className="text-base">{media.title}</span>
              <Badge 
                className={cn(
                  "w-fit text-xs",
                  getBadgeColor(media.type)
                )}
              >
                {media.type}
              </Badge>
            </div>
          </td>
        )}
        
        {visibleColumns.rating && (
          <td className="p-2">
            <MediaRating 
              rating={media.rating} 
              mediaId={media.id}
            />
          </td>
        )}
        
        {visibleColumns.notes && (
          <td className="p-2 max-w-[250px]">
            <div className="flex items-start gap-2">
              <div className="truncate text-sm text-muted-foreground">
                {media.notes?.substring(0, 100) || "No notes"}
                {media.notes?.length > 100 && "..."}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotesEdit();
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </td>
        )}
      </tr>
      
      {isExpanded && (
        <tr className="bg-secondary/50">
          <td colSpan={5 + (visibleColumns.image ? 1 : 0)}>
            <div className="p-4 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
              {/* Media details */}
              <div className="flex flex-col space-y-2">
                <img 
                  src={media.imageUrl} 
                  alt={media.title}
                  className="w-full max-h-[300px] object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{media.title}</h3>
                <Badge 
                  className={cn(
                    "w-fit",
                    getBadgeColor(media.type)
                  )}
                >
                  {media.type}
                </Badge>
              </div>
              
              {/* Summary and notes */}
              <div className="flex flex-col space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Summary</h4>
                  <p className="text-sm">{media.summary}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                    {!editingNotes && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleNotesEdit}
                        className="h-8"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Notes
                      </Button>
                    )}
                  </div>
                  
                  {editingNotes ? (
                    <div className="space-y-2">
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[100px]"
                        placeholder="Write your notes here..."
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setNotes(media.notes);
                            setEditingNotes(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleNotesSave}
                        >
                          Save Notes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{media.notes || "No notes added yet."}</p>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default MediaRow;
