import { Sidebar } from "../components/sidebar";
import { Adminheader} from "../components/adminHeader";
import { TopMenuBar } from "../components/topMenuBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

// LAYOUT WITH SIDEBAR
// const Layout = ({ children }) => {
//   const dispatch = useAppDispatch();
//   const showSideBar = useAppSelector((state)=>state.dashboard.showSideBar);
//   return (
//       <div>
//        <div className={`${'h-full md:flex md:flex-col md:fixed md:inset-y-0 z-80  admin-menu-side-cls'}`}>
//           <Sidebar />
//         </div>
//         <main className={`${"pb-10 pt-5"} ${showSideBar ? 'md:pl-72' : 'md:pl-20'}`}>
//           {children}
//         </main>
//       </div>
//   );
// }

const Layout = ({ children }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="h-full relative">
      {/* Top Menu Bar */}
      <div className="md:flex md:flex-col md:fixed md:inset-x-0 z-[9999] bg-white bg-opacity-100">
        <TopMenuBar /> {/* Updated to use the TopMenuBar instead of Sidebar */}
      </div>

      {/* Main content area */}
      <main className={`pt-40 pb-10 w-full`}>
        {children}
      </main>
    </div>
  );
}

export default Layout;