import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import SidebarNav from "./components/SidebarNav";

const Root = () => {
  return (
    <>
      <SidebarProvider>
        <SidebarNav />
        <main>
          <SidebarTrigger />
        </main>
        <Outlet />
      </SidebarProvider>
    </>
  );
};

export default Root;
