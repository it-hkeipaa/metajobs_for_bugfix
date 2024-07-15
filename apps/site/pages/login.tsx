import { Loader } from "@/src/components/lib/loader";
import { UserLogin } from "@/src/components/lib/user";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Layout from "../src/components/frontend/layout";
import LoginForm from "../src/components/register/login-form";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const { addToast } = useToasts();

  useEffect(() => {
    if (router?.query?.error && session.status === "unauthenticated") {
      addToast("Email or Password is incorrect", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [router, session]);

  if (session.status === "unauthenticated") {
    return (
      <>
        <Head>
          <meta name="description" content="Login to your dashboard" />
        </Head>

        <Layout>
          <main>
            <section className="py-24 md:py-32 bg-light">
              <LoginForm />
            </section>
          </main>
        </Layout>
      </>
    );
  }

  if (session.status === "authenticated") return <UserLogin />;
  return <Loader />;
};

export default Login;
