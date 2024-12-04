import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Root = () => {
  return (
    <div>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <Sidebar />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
