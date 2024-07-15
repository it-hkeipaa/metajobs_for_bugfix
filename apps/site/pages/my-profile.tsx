import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../src/components/dashboard/layout";
import ProfileBox from "../src/components/dashboard/profile";
import { UserNotLogin } from "../src/components/lib/user";

export default function MyProfile() {
  const { data, status } = useSession();
  const userData = data?.user;

  return (
    <>
      <Head>
        <meta name="description" content="My profile " />
      </Head>

      <Layout>
        <main>
          {status === "unauthenticated" && <UserNotLogin />}
          {userData && status === "authenticated" && (
            <ProfileBox data={userData} />
          )}
        </main>
      </Layout>
    </>
  );
}
