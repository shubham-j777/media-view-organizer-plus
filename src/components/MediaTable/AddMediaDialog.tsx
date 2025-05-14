
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMedia } from "@/contexts/MediaContext";
import { Plus } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MediaType } from "@/types/media";

const AddMediaDialog = () => {
  const { addMedia } = useMedia();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "anime" as MediaType,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    summary: "",
    rating: null as number | null,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMedia(formData);
    setFormData({
      title: "",
      type: "anime" as MediaType,
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      summary: "",
      rating: null,
      notes: "",
    });
    setOpen(false);
  };

  // Sample image URLs for different media types
  const getRandomImageUrl = (type: MediaType) => {
    const imageUrls = {
      anime: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      ],
      movie: [
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      ],
      series: [
        "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      ],
    };
    
    const urls = imageUrls[type];
    return urls[Math.floor(Math.random() * urls.length)];
  };

  const handleTypeChange = (value: MediaType) => {
    setFormData({
      ...formData,
      type: value,
      imageUrl: getRandomImageUrl(value),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> 
          Add Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Media</DialogTitle>
            <DialogDescription>
              Add a new anime, movie or series to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleTypeChange(value as MediaType)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="series">Series</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="summary" className="text-right pt-2">
                Summary
              </Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right pt-2">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="col-span-3"
                placeholder="Your personal thoughts..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add to Collection</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMediaDialog;
