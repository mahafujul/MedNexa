"use client";
import React, { useState, useEffect } from "react";

// Importing custom components
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { toast } from "sonner";

// Define the Appointment type
export type Appointment = {
  id: string;
  status: "Pending" | "Complete";
  doctorName: string;
  date: string;
  completed: boolean;
};

// Define table columns for appointments
export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <p
          className={`${
            row.getValue("completed") ? "bg-green-200" : "bg-red-200"
          } p-1 rounded-sm w-fit`}
        >
          {row.getValue("completed") ? "Completed" : "Pending"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "doctorName",
    header: () => <div>Doctor Name</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("doctorName")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      // Parse the date string and format it to "MM/DD/YYYY"
      const formattedDate = new Date(row.getValue("date")).toLocaleDateString();
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "timeSlot",
    header: () => <div>Time Slot</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("timeSlot")}</div>;
    },
  },
];

type Props = {};

// Main component for displaying bookings
export default function MyBookings({}: Props) {
  const [data, setData] = useState<Appointment[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  // Fetch all appointments from the API
  async function fetchAllAppointments() {
    try {
      const response = await axios.get("/api/appointments/get-all");
      setData(response?.data?.appointments || []);

      // Display success message using toast notification
      toast(response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (err: any) {
      // Display error message using toast notification on registration failure
      toast(err.response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }

  // Initialize table instance with necessary models and state handlers
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // JSX return
  return (
    <Layout>
      {/* Header section */}
      <LayoutHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </LayoutHeader>

      {/* Body section */}
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter doctor names..."
              value={
                (table.getColumn("doctorName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("doctorName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
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
        </div>
      </LayoutBody>
    </Layout>
  );
}
