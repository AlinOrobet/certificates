"use client";

import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";

type Student = {
  id: string;
  nume: string;
  prenume: string;
  titlu: string;
  email: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "numeComplet",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cicluStudiu",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Study cycle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "anStudiu",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Study year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "programStudiu",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Study program
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
