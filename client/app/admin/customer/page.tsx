"use client";

import * as React from "react";
import axios from "axios";

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
export type User = {
  id: number;
  email: string;
  username: string;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
};

/* =======================
   DELETE USER
======================= */
function DeleteDialog({
  item,
  onDeleted,
}: {
  item: User;
  onDeleted: (id: number) => void;
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/users/${item.id}`);
      toast("User deleted successfully");
      onDeleted(item.id);
    } catch {
      toast("Failed to delete user");
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
          <DialogTitle>Delete User?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user?
          </DialogDescription>
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
   USER FORM
======================= */
function UserForm({
  item,
  onSuccess,
}: {
  item?: User;
  onSuccess: (user: User) => void;
}) {
  const [formData, setFormData] = React.useState({
    firstname: item?.name.firstname ?? "",
    lastname: item?.name.lastname ?? "",
    email: item?.email ?? "",
    username: item?.username ?? "",
    phone: item?.phone ?? "",
    city: item?.address.city ?? "",
    street: item?.address.street ?? "",
    number: item?.address.number ?? 0,
    zipcode: item?.address.zipcode ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      address: {
        city: formData.city,
        street: formData.street,
        number: Number(formData.number),
        zipcode: formData.zipcode,
      },
    };

    try {
      const res = item
        ? await axios.put(`https://fakestoreapi.com/users/${item.id}`, payload)
        : await axios.post("https://fakestoreapi.com/users", payload);

      toast(item ? "User updated" : "User added");
      onSuccess(res.data);
    } catch {
      toast("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <Input
        id="firstname"
        placeholder="First name"
        value={formData.firstname}
        onChange={handleChange}
      />
      <Input
        id="lastname"
        placeholder="Last name"
        value={formData.lastname}
        onChange={handleChange}
      />
      <Input
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        id="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        id="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        id="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <Input
        id="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
      />
      <Input
        id="number"
        type="number"
        placeholder="House No."
        value={formData.number}
        onChange={handleChange}
      />
      <Input
        id="zipcode"
        placeholder="Zip code"
        value={formData.zipcode}
        onChange={handleChange}
      />

      <Button className="bg-indigo-700">
        {item ? "Update User" : "Add User"}
      </Button>
    </form>
  );
}

/* =======================
   ADD / EDIT USER
======================= */
function UserDialog({
  item,
  onSuccess,
}: {
  item?: User;
  onSuccess: (user: User) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {item ? (
          <Button variant="outline" size="icon">
            <EditIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-indigo-600 hover:bg-indigo-800">
            Add User
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>

        <UserForm item={item} onSuccess={onSuccess} />
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
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const columns: ColumnDef<User>[] = [
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
      header: "Name",
      cell: ({ row }) =>
        `${row.original.name.firstname} ${row.original.name.lastname}`,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "phone", header: "Phone" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <UserDialog
            item={row.original}
            onSuccess={(updated) =>
              setData((prev) =>
                prev.map((u) => (u.id === updated.id ? updated : u))
              )
            }
          />
          <DeleteDialog
            item={row.original}
            onDeleted={(id) =>
              setData((prev) => prev.filter((u) => u.id !== id))
            }
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 6 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="px-5">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Search users..."
          onChange={(e) =>
            table.getColumn("email")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <UserDialog onSuccess={(u) => setData((p) => [u, ...p])} />
      </div>

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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2 py-4">
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

/* =======================
   PAGE
======================= */
export default function Users() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return <DataTable data={users} setData={setUsers} />;
}
