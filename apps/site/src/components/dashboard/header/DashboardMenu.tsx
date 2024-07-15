import { deleteCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import {
  AdminMenuList,
  DashboardMenuList,
  EmployerMenuList,
} from "../../@menuData/menu";

// Dashboard Menu by clicking on user image
const DashboardMenu = ({ active }: { active: any }) => {
  const { data } = useSession();
  const isCandidate = data?.user?.role?.isCandidate;
  const isAdmin = data?.user?.role?.isAdmin;
  const isEmployer = data?.user?.role?.isEmployer;
  return (
    <>
      <div
        className={`top-[calc(130%-8px)] absolute w-[230px] rounded-lg overflow-hidden p-0 -right-[15px] text-left transition-all duration-300 ease-in-out z-[999] shadow-xl before:content-[''] before:absolute before:right-[43px] before:-top-[6px] before:w-0 before:h-0 before:border-l-transparent before:border-r-transparent before:border-b-[rgb(247_248_250)] before:transition-all before:ease-in-out before:duration-300   ${
          active
            ? "transform scale-100 visible opacity-100"
            : "opacity-0 invisible transform scale-[0.95]"
        } bg-white`}
      >
        <ul>
          {data?.user && isCandidate && (
            <>
              {DashboardMenuList.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray last-of-type:border-b-0"
                >
                  <Link href={item.link}>
                    <a className="flex items-center gap-3 w-full duration-300 ease-in-out p-3 hover:bg-themePrimary text-base text-themeDarker hover:text-white group">
                      <span className="text-themePrimary group-hover:text-white">
                        {item?.icon}
                      </span>
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </>
          )}
          {data?.user && isEmployer && (
            <>
              {EmployerMenuList.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray last-of-type:border-b-0"
                >
                  <Link href={item.link}>
                    <a className="flex items-center gap-3 w-full duration-300 ease-in-out p-3 hover:bg-themePrimary text-base text-themeDarker hover:text-white group">
                      <span className="text-themePrimary group-hover:text-white">
                        {item?.icon}
                      </span>
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </>
          )}
          {data?.user && isAdmin && (
            <>
              {AdminMenuList.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray last-of-type:border-b-0"
                >
                  <Link href={item.link}>
                    <a className="flex items-center gap-3 w-full duration-300 ease-in-out p-3 hover:bg-themePrimary text-base text-themeDarker hover:text-white group">
                      <span className="text-themePrimary group-hover:text-white">
                        {item?.icon}
                      </span>
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </>
          )}
          <li>
            <button
              className="flex items-center gap-3 text-left w-full duration-300 ease-in-out p-3 text-base bg-red-400 hover:bg-red-500 text-white"
              onClick={() => {
                signOut().then(() => {
                  deleteCookie("accessToken");
                });
              }}
            >
              {/* Log out icon */}
              <BiLogOut className="w-5 h-5 flex-none" />
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardMenu;
