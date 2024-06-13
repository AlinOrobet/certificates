"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useConfirm} from "@/hooks/use-confirm";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useTranslations} from "next-intl";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  filterLabel: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  filterLabel,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations();
  const [ConfirmDialog, confirm] = useConfirm(t("ARE_YOU_SURE"), t("ARE_YOU_SURE_DELETE_ALL"));

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <ConfirmDialog />
      <div className="flex items-center py-4">
        <Input
          placeholder={`Search by ${filterLabel}`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
          className="text-sm px-3 py-1 h-8 w-auto"
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
