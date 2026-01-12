import React from "react";
import AdminSidebar from "./components/adminsidebar";

const layout = ({ children }) => {
  return (
    <div>
      <div className="flex">
        {" "}
        <AdminSidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;
