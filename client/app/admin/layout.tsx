import type { ReactNode } from "react";
import AdminSidebar from "./components/adminsidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <AdminSidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;
