import AdvertisementVertical from "./AdvertisementVertical";
import SidebarCategory from "./SidebarCategory";
import SidebarPopularPost from "./SidebarPopularPost";

const Sidebar = ({ data }: any) => {
  return (
    <div className="col-span-12 mx-auto lg:col-span-4 flex flex-col gap-5 justify-center order-last lg:order-none">
      <SidebarPopularPost data={data} />
      <SidebarCategory />
      <AdvertisementVertical />
    </div>
  );
};

export default Sidebar;
