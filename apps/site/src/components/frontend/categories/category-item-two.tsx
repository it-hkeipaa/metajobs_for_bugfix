import { CircleArrowIcon } from "@/src/icons";
import _ from "lodash";
import { useRouter } from "next/router";
import Image from "../../optimize/image";

// const CategoryItemTwo = ({ data) => {
const CategoryItemTwo = ({ category }: { category: any }) => {
  const router = useRouter();

  const OnSearchHandler = (title: any) => {
    const values = {
      category: title,
    };
    const filtered = _.pickBy(values, (value) => value !== "");
    router.push({
      pathname: "/find-job",
      query: filtered,
    });
  };

  return (
    <div className="bg-white p-3 border-white border border-solid transition-all rounded-md group hover:border-themePrimary">
      <div>
        <div className="mb-2">
          <Image
            width={70}
            height={70}
            src={category?.avatar}
            alt="img"
            className={`rounded-lg`}
          />
        </div>
        <h3 className="text-xxs font-normal text-black leading-6 mb-1">
          {/* {data.name} */}
          {category?.categoryTitle}
        </h3>
        {/* <p className="text-grayLight text-xss font-normal">{data.count} Jobs</p> */}
        <p className="text-grayLight text-xss font-normal">
          {category?.count} Job{category?.count > 1 && <span>s</span>}
        </p>
        <a
          onClick={() => OnSearchHandler(category?.categoryTitle)}
          className="text-xss1 font-medium text-themePrimary hover:text-themePrimary leading-5 flex gap-4 items-center cursor-pointer"
        >
          View All Job
          <CircleArrowIcon
            className="w-[16px] h-[16px] text-themePrimary"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
};

export default CategoryItemTwo;
