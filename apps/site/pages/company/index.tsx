import CompanyItem from "@/src/components/frontend/company/company-item";
import { CompanyFilter } from "@/src/components/frontend/filter/search-filter";
import Layout from "@/src/components/frontend/layout";
import PageTitle from "@/src/components/frontend/page-title";
import Pagination from "@/src/components/frontend/pagination";
import ImageOpt from "@/src/components/optimize/image";
import { Axios } from "@/src/components/utils/axiosKits";
import companiesPerData from "@/src/data/companiesData.json";
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => Axios(url).then((res) => res.data.data);
const CompanyAPI = "/companies/search";

function CompanyDataList() {
  // get current pages
  const [currentPage, setCurrentPage] = React.useState(0);
  const [companiesPerPage] = React.useState(9);
  const [AllCompanies, setAllCompanies] = React.useState({
    totalCompanyCount: 0,
  }) as any;
  const [companyFilter, setCompanyFilter] = React.useState({});
  const router = useRouter();
  const API =
    router.pathname === router.asPath
      ? `${CompanyAPI}?page=${currentPage}`
      : `${CompanyAPI}${router.asPath.replace(
          "/company",
          ""
        )}&page=${currentPage}`;
  const { data, error } = useSWR(API, fetcher, {
    fallbackData: {
      companies: companiesPerData,
      companyFilter: companyFilter,
      totalCompanyCount: AllCompanies?.totalCompanyCount || 0,
      loading: true,
    },
  });

  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected);
  };

  React.useEffect(() => {
    if (data) {
      setCompanyFilter(data.companyFilter);
    }
    if (!data.loading) {
      setAllCompanies(data);
    }
  }, [data]);

  if (error) return <div>Error! {error.message}</div>;
  if (!data)
    return (
      <div className="h-80 w-full flex justify-center items-center">
        <h1 className="text-5xl font-semibold text-center">Loading...</h1>
      </div>
    );

  return (
    <>
      <section className="pt-16 pb-20 !bg-light">
        <div className="container 2xl:px-0">
          <div className="xl:grid grid-cols-12 gap-6">
            <CompanyFilter setCurrentPage={setCurrentPage} />

            <div className="col-span-9">
              <div className="bg-white rounded-md md:flex flex-wrap justify-between items-center mb-6 py-2.5 md:py-2">
                <p className="text-xs font-bold text-black leading-4 px-6 mb-6 md:mb-0">
                  We have found{" "}
                  <span className="text-themePrimary">
                    {AllCompanies?.totalCompanyCount}
                  </span>{" "}
                  Company
                </p>
                <div className="text-center mr-2.5">
                  <Link href="/company/add-company">
                    <a className="block w-auto bg-themePrimary text-white px-6 py-2.5 text-xss font-medium rounded-md hover:bg-black transition-all outline-none">
                      Add Your Company
                    </a>
                  </Link>
                </div>
              </div>
              <div className="grid gap-6 xl:gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                {data?.loading &&
                  _.map(data.companies, (item) => (
                    <div key={item.id}>
                      <ImageOpt
                        src={item ? item?.img : "assets/img/cm-logo1.png"}
                        alt="image"
                        width={315}
                        height={437}
                      />
                    </div>
                  ))}
                {!data?.loading &&
                  AllCompanies?.companies?.length > 0 &&
                  _.map(AllCompanies?.companies, (item) => (
                    <CompanyItem key={item._id} item={item} />
                  ))}
              </div>
              {!data?.loading && AllCompanies.length === 0 && (
                <div className="h-80 flex justify-center items-center text-center">
                  <h2 className="text-4xl font-semibold">No Data Found ☹️</h2>
                </div>
              )}

              {AllCompanies?.totalCompanyCount > companiesPerPage && (
                <Pagination
                  totalCount={AllCompanies?.totalCompanyCount}
                  showPerPage={companiesPerPage}
                  handlePageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Company() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Company List. Explore the expert companies. Find all companies."
        />
      </Head>

      <Layout>
        <main>
          <PageTitle title="All Companies" />
          <CompanyDataList />
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // connect api to get data
  return {
    props: {},
  };
}
