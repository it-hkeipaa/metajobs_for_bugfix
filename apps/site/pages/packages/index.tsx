import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../src/components/dashboard/layout";
import AllPackages from "../../src/components/dashboard/packages/all-packages";
import { UserGoBack, UserNotLogin } from "../../src/components/lib/user";

const Packages = () => {
  const { data, status } = useSession();
  const userData = data?.user;
  const isAdmin = userData?.role.isAdmin;

  return (
    <>
      <Head>
        <meta name="description" content="Your package to get features" />
      </Head>

      <Layout>
        <main>
          {status === "unauthenticated" && <UserNotLogin />}
          {userData && !isAdmin && status === "authenticated" && <UserGoBack />}
          {userData && status === "authenticated" && isAdmin && <AllPackages />}
        </main>
      </Layout>
    </>
  );
};

export default Packages;
