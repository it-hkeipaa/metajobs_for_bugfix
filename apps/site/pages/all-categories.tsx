import Head from "next/head";
import React from "react";
import { ThemeContext } from "../src/context/ThemeContext";
import CategorySection from "../src/components/frontend/categories/category-section";
import Layout from "../src/components/frontend/layout";
import PageTitle from "../src/components/frontend/page-title";
import { LoaderGrowing } from "../src/components/lib/loader";

export default function AllCategory() {
  const { categoryData, categoryError } = React.useContext(ThemeContext) as any;

  if (categoryError) return <div>Error! {categoryError.message}</div>;
  if (!categoryData) return <LoaderGrowing />;

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Explore the latest tech job opportunities. Find all jobs category. Your next tech career awaits."
        />
      </Head>

      <Layout>
        <main>
          <PageTitle title="All Categories" />
          <section className="pt-20 pb-24 !bg-light">
            <div className="container">
              <CategorySection categoryData={categoryData} />
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
