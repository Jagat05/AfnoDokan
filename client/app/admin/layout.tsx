import type { ReactNode } from "react";
import AdminSidebar from "./components/adminsidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default layout;
