
import { useMedia } from "@/contexts/MediaContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useMedia();

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search media..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default SearchInput;
