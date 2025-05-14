
import React, { useState } from "react";
import { useMedia } from "@/contexts/MediaContext";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaRatingProps {
  rating: number | null;
  mediaId: string;
}

const MediaRating: React.FC<MediaRatingProps> = ({ rating, mediaId }) => {
  const { updateMedia } = useMedia();
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingChange = (newRating: number) => {
    updateMedia(mediaId, { rating: newRating });
  };

  return (
    <div 
      className="flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {[...Array(10)].map((_, i) => {
        const ratingValue = i + 1;
        
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4 cursor-pointer transition-colors",
              (hoveredRating !== null && hoveredRating >= ratingValue) || 
              (hoveredRating === null && rating !== null && rating >= ratingValue)
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground"
            )}
            onMouseEnter={() => setHoveredRating(ratingValue)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => handleRatingChange(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default MediaRating;
