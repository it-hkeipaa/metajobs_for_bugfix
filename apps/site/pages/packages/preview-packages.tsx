import { useSession } from "next-auth/react";
import Layout from "../../src/components/dashboard/layout";
import PreviewPackages from "../../src/components/dashboard/packages/preview-packages";
import { UserGoBack, UserNotLogin } from "../../src/components/lib/user";

const PreviewPackage = () => {
  const { data, status } = useSession();
  const userData = data?.user;
  const isAdmin = userData?.role.isAdmin;

  return (
    <>
      <Layout>
        <main>
          {status === "unauthenticated" && <UserNotLogin />}
          {userData && !isAdmin && status === "authenticated" && <UserGoBack />}
          {userData && status === "authenticated" && isAdmin && (
            <PreviewPackages />
          )}
        </main>
      </Layout>
    </>
  );
};

export default PreviewPackage;
