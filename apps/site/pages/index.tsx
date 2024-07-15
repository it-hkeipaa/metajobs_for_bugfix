import loadingCategory from "@/src/data/loadingCategory.json";
import apiConnector from "@metajob/api-connector";
import Head from "next/head";
import useSWR from "swr";
import Banner from "../src/components/frontend/banner";
import Blog from "../src/components/frontend/blog";
import PopularCategories from "../src/components/frontend/categories/popular-categories";
import RecentJob from "../src/components/frontend/job/recent-job";
import Layout from "../src/components/frontend/layout";
import Testimonials from "../src/components/frontend/testimonials";
import { Axios } from "../src/components/utils/axiosKits";
import blogsDataPre from "../src/data/blogData.json";
import testimonialsDataPre from "../src/data/testimonialsData.json";

const fetcher = (url: string) => Axios(url).then((res: any) => res.data.data);
const JobsAPI = "/jobs/retrives";
const catsAPI = "/jobs/categories/retrives";
const blogsAPI = "/blogs/retrives";
const testimonialsAPI = "/testimonials/retrives";

function CategoryData({
  categoryData,
  categoryError,
}: {
  categoryData: any;
  categoryError: any;
}) {
  // if (categoryError) return <div>Error! {categoryError.message}</div>
  if (!categoryData) {
    return <PopularCategories data={loadingCategory} />;
  }

  return <>{categoryData && <PopularCategories data={categoryData} />}</>;
}

function PopularJobsData({ jobs }: { jobs: any }) {
  const { data: Jobs, error } = useSWR(JobsAPI, fetcher, {
    fallbackData: jobs,
  });

  return (
    <>
      <RecentJob data={Jobs} />
    </>
  );
}

export default function Home({
  jobs,
  totalCount,
}: {
  jobs: any;
  totalCount: any;
}) {
  /**
   * Call Serverless API to fetch @Category Data.
   * @fallback use loader data.
   * @returns {Array} category Data.
   */

  const { data: categoryData, error: categoryError } = useSWR(catsAPI, fetcher);

  /**
   * Call Serverless API to fetch @Blogs Data.
   * @fallback use loader data.
   * @returns {Array} category Data.
   */

  const { data: blogsData, error: blogsError } = useSWR(blogsAPI, fetcher, {
    fallbackData: blogsDataPre,
  });

  /**
   * Call Serverless API to fetch @Testimonials Data.
   * @fallback use loader use fallbackData
   * @returns {Array} category Data.
   */
  const { data: testimonialsData, error: testimonialsError } = useSWR(
    testimonialsAPI,
    fetcher,
    {
      fallbackData: testimonialsDataPre,
    },
  );

  return (
    <>
      <Head>
        <title>MetaJobs- Find Your Dream Job</title>
        <meta
          name="description"
          content="Best job portal to find your dream job. Find all jobs category. Your next tech career awaits."
        />
      </Head>

      <Layout>
        <main>
          <Banner totalCount={totalCount} />

          <CategoryData
            categoryData={categoryData}
            categoryError={categoryError}
          />

          <PopularJobsData jobs={jobs} />

          <Testimonials data={testimonialsData} />
          <Blog data={blogsData} />
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();
  try {
    // connect api to get data

    const jobs = await connect.getJobs();

    const totalCountData = await connect.getTotalCount();

    const categories = await connect.getCategories();

    // serialize the data to json
    const getJobs = JSON.stringify(jobs);

    return {
      props: {
        jobs: getJobs,
        totalCount: totalCountData,
      },
    };
  } catch (error: any) {
    return {
      props: {
        jobs: [],
        totalCount: 0,
        categories: [],
      },
    };
  }
}
