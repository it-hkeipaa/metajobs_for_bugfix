import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../src/components/dashboard/layout";
import PreviewPackages from "../../src/components/dashboard/packages/preview-packages";
import { UserGoBack, UserNotLogin } from "../../src/components/lib/user";

const ActivePackage = () => {
  const { data, status } = useSession();
  const userData = data?.user;
  const isEmployer = userData?.role.isEmployer;

  return (
    <>
      <Head>
        <meta name="description" content="Active package" />
      </Head>

      <Layout>
        <main>
          {status === "unauthenticated" && <UserNotLogin />}
          {userData && !isEmployer && status === "authenticated" && (
            <UserGoBack />
          )}
          {userData && status === "authenticated" && isEmployer && (
            <PreviewPackages />
          )}
        </main>
      </Layout>
    </>
  );
};

export default ActivePackage;
