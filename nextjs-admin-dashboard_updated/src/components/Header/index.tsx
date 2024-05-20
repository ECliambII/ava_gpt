import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div>
          <Link className="my-3 inline-block block sm:hidden" href="/">
            <Image
              src={"/images/logo/logo-blue.png"}
              alt="Logo"
              width={100}
              height={20}
            />
          </Link>
          <Link className="my-3 inline-block hidden sm:block" href="/">
            <Image
              src={"/images/logo/logo-blue.png"}
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7 left-0">
          <ul className="flex items-center gap-2 2xsm:gap-4">

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
