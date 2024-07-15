import { useSession } from "next-auth/react";
import Head from "next/head";
import AllList from "../src/components/dashboard/bookmarks/all-list";
import Layout from "../src/components/dashboard/layout";
import { UserNotLogin } from "../src/components/lib/user";

export default function Bookmarks() {
  const { data, status } = useSession();
  const userData = data?.user;

  return (
    <>
      <Head>
        <meta name="description" content="Bookmark jobs, company and resume" />
      </Head>
      <Layout>
        <main>
          {status === "unauthenticated" && <UserNotLogin />}
          {userData && status === "authenticated" && <AllList />}
        </main>
      </Layout>
    </>
  );
}
