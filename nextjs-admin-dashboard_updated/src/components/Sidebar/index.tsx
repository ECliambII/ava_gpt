"use client";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiHomeAlt, BiUser } from "react-icons/bi"; 
import { BsChatLeft } from "react-icons/bs";
import { FiSettings } from "react-icons/fi"; 
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebar = useRef<any>(null);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black dark:bg-boxdark`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto ">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-4 py-4 lg:mt-7">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="flex flex-col gap-1.5">
              <li className="mb-4">
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark`}
                >
                  <RxDashboard style = {{transform: 'rotate(45deg)'}} size={'1.5em'} />
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    (pathname === "/" ||
                      pathname.includes("dashboard")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BiHomeAlt size={'1.5em'} />
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
              {/* <!-- Menu Item Profile --> */}
              <li>
                <Link
                  href="/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BiUser size={'1.5em'} />
                </Link>
              </li>
              {/* <!-- Menu Item Profile --> */}
              {/* <!-- Menu Item Chat --> */}
              <li>
                <Link
                  href="/chat"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >

                  <BsChatLeft size={'1.3em'} />
                </Link>
              </li>
              {/* <!-- Menu Item Chat --> */}
            </ul>
          </div>
          <div className="absolute bottom-0 pb-5">
            {/* <!-- Menu Item Settings --> */}
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FiSettings size={'1.5em'} />
                </Link>
              </li>
            </ul>
            {/* <!-- Menu Item Settings --> */}
          </div>

         
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
