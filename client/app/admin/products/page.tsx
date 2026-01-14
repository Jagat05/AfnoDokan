"use client";

import * as React from "react";
import axios from "axios";
import Image from "next/image";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowUpDown, EditIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

/* =======================
   TYPES
======================= */
export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
};

/* =======================
   DELETE DIALOG
======================= */
function DeleteDialog({
  item,
  onDeleted,
}: {
  item: Product;
  onDeleted: (id: number) => void;
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${item.id}`);
      toast("Product deleted successfully");
      onDeleted(item.id);
    } catch {
      toast("Failed to delete product");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product?</DialogTitle>
          <DialogDescription>Are you sure to Delete??</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete} className="bg-red-600">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* =======================
   PRODUCT FORM
======================= */
function ProductForm({
  item,
  onSuccess,
}: {
  item?: Product;
  onSuccess: (product: Product) => void;
}) {
  const [formData, setFormData] = React.useState({
    title: item?.title ?? "",
    price: item?.price ?? 0,
    description: item?.description ?? "",
    category: item?.category ?? "",
    image: item?.image ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = item
        ? await axios.put(
            `https://fakestoreapi.com/products/${item.id}`,
            formData
          )
        : await axios.post("https://fakestoreapi.com/products", formData);

      toast(item ? "Product updated" : "Product added");
      onSuccess(res.data);
    } catch {
      toast("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        id="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <Input
        id="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <textarea
        id="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border rounded-md p-2"
      />
      <Input
        id="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <Input
        id="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <Button className="bg-indigo-700">
        {item ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}

/* =======================
   ADD / EDIT DIALOG
======================= */
function ProductDialog({
  item,
  onSuccess,
}: {
  item?: Product;
  onSuccess: (product: Product) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {item ? (
          <Button variant="outline" size="icon">
            <EditIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-indigo-600 hover:bg-indigo-800 ">
            Add Product
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <ProductForm item={item} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}

/* =======================
   DATA TABLE
======================= */
function DataTable({
  data,
  setData,
}: {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image src={row.getValue("image")} alt="" width={40} height={40} />
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${Number(row.getValue("price")).toFixed(2)}`,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <ProductDialog
            item={row.original}
            onSuccess={(updated) =>
              setData((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              )
            }
          />
          <DeleteDialog
            item={row.original}
            onDeleted={(id) =>
              setData((prev) => prev.filter((p) => p.id !== id))
            }
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: 6 },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="px-5">
      {/* Filter + Add */}
      <div className="flex justify-between py-4">
        <Input
          placeholder="Search products..."
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <ProductDialog
          onSuccess={(product) => setData((prev) => [product, ...prev])}
        />
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
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
                  className="text-center h-24"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

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
  );
}

/* =======================
   PAGE
======================= */
export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return <DataTable data={products} setData={setProducts} />;
}
