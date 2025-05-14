
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Columns3 } from "lucide-react";
import { useMedia } from "@/contexts/MediaContext";

const ColumnToggle = () => {
  const { visibleColumns, toggleColumnVisibility } = useMedia();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Columns3 className="h-4 w-4" />
          <span>Columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={visibleColumns.image}
          onCheckedChange={() => toggleColumnVisibility("image")}
        >
          Image
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibleColumns.title}
          onCheckedChange={() => toggleColumnVisibility("title")}
        >
          Title
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibleColumns.type}
          onCheckedChange={() => toggleColumnVisibility("type")}
        >
          Type
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibleColumns.rating}
          onCheckedChange={() => toggleColumnVisibility("rating")}
        >
          Rating
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibleColumns.notes}
          onCheckedChange={() => toggleColumnVisibility("notes")}
        >
          Notes
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnToggle;
