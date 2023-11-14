import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

interface SortingButtonProps {
  column: Column<any, unknown>;
  children: React.ReactNode;
}

const SortingButton: React.FC<SortingButtonProps> = ({ column, children }) => (
  <Button
    variant="ghost"
    className="font-bold text-amber-600"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export default SortingButton;
