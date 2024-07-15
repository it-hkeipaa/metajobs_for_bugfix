import SortBy from "@/src/components/frontend/filter/data-sort-by";
import { JobsFilter } from "@/src/components/frontend/filter/search-filter";
import JobItem from "@/src/components/frontend/job/job-item";
import Layout from "@/src/components/frontend/layout";
import PageTitle from "@/src/components/frontend/page-title";
import Pagination from "@/src/components/frontend/pagination";
import ImageOpt from "@/src/components/optimize/image";
import { Axios } from "@/src/components/utils/axiosKits";
import jobsData from "@/src/data/jobsData.json";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => Axios(url).then((res) => res.data.data);
let AllAPI = "/jobs/search";

export default function FindJob() {
  const [jobTypes, setJobTypes] = React.useState([]);
  const [jobExperience, setJobExperience] = React.useState([]);

  // get current pages
  const [currentPage, setCurrentPage] = React.useState(0);
  const [jobsPerPage] = React.useState(9);
  const [AllJobs, setAllJobs] = React.useState({
    totalJobCount: 0,
    jobs: [],
  });
  const router = useRouter();
  const API =
    router.pathname === router.asPath
      ? `${AllAPI}?page=${currentPage}`
      : `/jobs/search/${router.asPath
          .replace("/find-job", "")
          .replace(/%2C/g, ",")}&page=${currentPage}`;

  // call SWR
  const { data, error } = useSWR(API, fetcher, {
    fallbackData: {
      jobs: jobsData,
      filter: {
        jobTypes: jobTypes,
        jobExperience: jobExperience,
      },
      totalJobCount: AllJobs?.totalJobCount || 0,
      loading: true,
    },
  });

  React.useEffect(() => {
    if (data) {
      setJobTypes(data?.filter?.jobTypes);
      setJobExperience(data?.filter?.jobExperience);
    }
    if (!data.loading) {
      setAllJobs(data);
    }
  }, [data]);

  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Head>
        <title>Find Jobs</title>
        <meta name="description" content="Find Jobs" />
      </Head>

      <Layout>
        <main>
          <PageTitle title="Find Your Dream Job" excerpt={null} image={null} />
          {error && <div>Error! {error.message}</div>}
          {!data && (
            <div className="h-80 w-full flex justify-center items-center">
              <h1 className="text-5xl font-semibold text-center">Loading...</h1>
            </div>
          )}
          {data && (
            <>
              <section className="pt-14 pb-20 !bg-light">
                <div className="container 2xl:px-0">
                  <div className="xl:grid grid-cols-12 gap-6">
                    <JobsFilter
                      types={jobTypes}
                      jobExperience={jobExperience}
                      setCurrentPage={setCurrentPage}
                    />

                    <div className="col-span-9">
                      <SortBy totalCount={data?.totalJobCount} />
                      {data?.loading && (
                        <div className="grid gap-6 xl:gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center">
                          {_.map(data.jobs, (item) => (
                            <div key={item.id}>
                              <ImageOpt
                                src={item.img}
                                alt="image"
                                width={315}
                                height={418}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="grid gap-6 xl:gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center">
                        {!error &&
                          !data?.loading &&
                          data?.jobs.map((item: any) => (
                            <JobItem key={item._id} item={item} />
                          ))}
                      </div>
                      {!data?.loading && data?.jobs?.length === 0 && (
                        <div className="h-80 flex justify-center items-center text-center">
                          <h2 className="text-4xl font-semibold">
                            No Data Found ☹️
                          </h2>
                        </div>
                      )}
                      {AllJobs?.totalJobCount > jobsPerPage && (
                        <Pagination
                          totalCount={AllJobs?.totalJobCount}
                          showPerPage={jobsPerPage}
                          handlePageChange={handlePageChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </Layout>
    </>
  );
}
