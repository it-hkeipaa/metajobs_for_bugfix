import { useSession } from "next-auth/react";
import Head from "next/head";
import AllCompanies from "../../src/components/dashboard/companies/all-companies";
import Layout from "../../src/components/dashboard/layout";
import { UserGoBack, UserNotLogin } from "../../src/components/lib/user";

export default function ManagesCompanies() {
  const { data, status } = useSession();
  const userData = data?.user;
  const isCandidate = userData?.role.isCandidate;

  return (
    <>
      <Head>
        <meta name="description" content="Manage Your Company" />
      </Head>

      <Layout>
        <main>
          {status === "unauthenticated" && <UserNotLogin />}
          {isCandidate && <UserGoBack />}
          {userData && status === "authenticated" && !isCandidate && (
            <AllCompanies />
          )}
        </main>
      </Layout>
    </>
  );
}
