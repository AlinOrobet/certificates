"use client";

import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {Actions} from "./actions";
import {usePathname} from "next/navigation";
import PdfView from "./pdf-view";

type Certificate = {
  id: string;
  dataCerere: string;
  numeStudent: string;
  scop: string;
};

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nr.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "numeStudent",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Person
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dataCerere",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "scop",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reason
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "link",
    cell: ({row}) => <PdfView {...row.original} />,
  },
  {
    id: "actions",
    cell: ({row}) => <Actions id={row.original.id} scop={row.original.scop} />,
  },
];
