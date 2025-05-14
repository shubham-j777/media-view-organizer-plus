import React, { createContext, useContext, useState, useEffect } from "react";
import { Media, MediaType } from "../types/media";
import { mockMediaData } from "../data/mockData";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

export type MediaCategory = "all" | "anime" | "movie" | "webseries";

interface MediaContextProps {
  mediaList: Media[];
  addMedia: (media: Omit<Media, "id" | "createdAt" | "updatedAt">) => void;
  updateMedia: (id: string, updates: Partial<Media>) => void;
  deleteMedia: (id: string) => void;
  expandedMediaId: string | null;
  setExpandedMediaId: React.Dispatch<React.SetStateAction<string | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  visibleColumns: {
    image: boolean;
    title: boolean;
    type: boolean;
    rating: boolean;
    notes: boolean;
  };
  toggleColumnVisibility: (column: keyof typeof defaultVisibleColumns) => void;
  sortConfig: {
    key: keyof Media | null;
    direction: "asc" | "desc";
  };
  setSortConfig: React.Dispatch<
    React.SetStateAction<{
      key: keyof Media | null;
      direction: "asc" | "desc";
    }>
  >;
  selectedCategory: MediaCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<MediaCategory>>;
  filteredMediaList: Media[];
}

const defaultVisibleColumns = {
  image: true,
  title: true,
  type: true,
  rating: true,
  notes: true,
};

const MediaContext = createContext<MediaContextProps | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [expandedMediaId, setExpandedMediaId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>("all");
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Media | null;
    direction: "asc" | "desc";
  }>({
    key: "createdAt",
    direction: "desc",
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedMedia = localStorage.getItem("mediaList");
    if (savedMedia) {
      try {
        const parsedMedia = JSON.parse(savedMedia);
        // Convert string dates back to Date objects
        const formattedMedia = parsedMedia.map((media: any) => ({
          ...media,
          createdAt: new Date(media.createdAt),
          updatedAt: new Date(media.updatedAt),
        }));
        setMediaList(formattedMedia);
      } catch (error) {
        console.error("Error parsing saved media:", error);
        setMediaList(mockMediaData);
      }
    } else {
      setMediaList(mockMediaData);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever mediaList changes
    if (mediaList.length > 0) {
      localStorage.setItem("mediaList", JSON.stringify(mediaList));
    }
  }, [mediaList]);

  const addMedia = (media: Omit<Media, "id" | "createdAt" | "updatedAt">) => {
    const newMedia: Media = {
      ...media,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setMediaList((prev) => [newMedia, ...prev]);
    toast({
      title: "Media Added",
      description: `${media.title} has been added to your list.`,
    });
  };

  const updateMedia = (id: string, updates: Partial<Media>) => {
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date() }
          : item
      )
    );
    toast({
      title: "Media Updated",
      description: `The media has been updated successfully.`,
    });
  };

  const deleteMedia = (id: string) => {
    const mediaToDelete = mediaList.find(media => media.id === id);
    setMediaList((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Media Deleted",
      description: mediaToDelete 
        ? `${mediaToDelete.title} has been deleted from your list.`
        : "The media has been deleted from your list.",
      variant: "destructive",
    });
  };

  const toggleColumnVisibility = (column: keyof typeof defaultVisibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };
  
  // Filter media list based on selected category and search term
  const filteredMediaList = mediaList.filter((media) => {
    const matchesSearch = media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (media.notes && media.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedCategory === "all") {
      return matchesSearch;
    }
    
    const categoryMapping: Record<Exclude<MediaCategory, "all">, MediaType[]> = {
      "anime": ["anime"],
      "movie": ["movie"],
      "webseries": ["series"]
    };
    
    const categoryTypes = categoryMapping[selectedCategory as Exclude<MediaCategory, "all">] || [];
    return matchesSearch && categoryTypes.includes(media.type);
  });

  return (
    <MediaContext.Provider
      value={{
        mediaList,
        addMedia,
        updateMedia,
        deleteMedia,
        expandedMediaId,
        setExpandedMediaId,
        searchTerm,
        setSearchTerm,
        visibleColumns,
        toggleColumnVisibility,
        sortConfig,
        setSortConfig,
        selectedCategory,
        setSelectedCategory,
        filteredMediaList,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
