import { FormLoader } from "@/src/components/lib/loader";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import { useSWRConfig } from "swr";
import Layout from "../../src/components/frontend/layout";
import { authAxios } from "../../src/components/utils/axiosKits";
import { ThemeContext } from "../../src/context/ThemeContext";

const VerifyEmail = () => {
  const { data } = useSession();
  const isConfirmed = data?.user?.isConfirmed;
  const { LoginPopupHandler } = React.useContext(ThemeContext) as any;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToasts();

  // verify email handler
  const verifyHandler = async () => {
    setLoading(true);
    try {
      await authAxios({
        method: "POST",
        url: `/user/confirmation/${router.query.id}`,
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          mutate(`/users/retrivesf`).then(() => {
            setLoading(false);
          });
        }
      });
    } catch (error: any) {
      if (error?.response?.data) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <meta name="description" content="New password setup" />
      </Head>

      <Layout>
        <main>
          <div className="container">
            <div className="flex justify-center !px-5 my-20">
              <div className="w-full lg:w-1/2 !p-10 m-auto shadow rounded-lg bg-white">
                {!data?.user && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-800 !mb-3">
                        You are not logged in
                      </h1>
                      <p className="text-gray-600">Please login to continue</p>
                      <div className="mt-10">
                        <button
                          className={`!py-3 px-12 w-1/2 mx-auto !mt-10 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white font-normal text-center leading-6 ${
                            loading ? "bg-themeDarkerAlt" : "bg-themePrimary"
                          } rounded-md hover:bg-black`}
                          onClick={LoginPopupHandler}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {data?.user && !isConfirmed ? (
                  <>
                    <div className="!mb-3">
                      <MdMarkEmailUnread className="text-7xl mx-auto text-themeDarker" />
                    </div>
                    <h1 className="text-lg text-center font-semibold !mb-3">
                      Verify Email Address
                    </h1>
                    <p className="text-center text-themeLight w-3/4 mx-auto">
                      {`You're almost there! Please verify your email address by clicking the link we just sent you.`}
                    </p>
                    <button
                      className={`!py-3 px-12 w-1/2 mx-auto !mt-10 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white font-normal text-center leading-6 ${
                        loading ? "bg-themeDarkerAlt" : "bg-themePrimary"
                      } rounded-md hover:bg-black`}
                      type="submit"
                      onClick={verifyHandler}
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "Verify Email"}
                      {loading && <FormLoader />}
                    </button>
                  </>
                ) : (
                  data?.user &&
                  isConfirmed && (
                    <>
                      <div className="!mb-3">
                        <MdMarkEmailRead className="text-7xl mx-auto text-themePrimary" />
                      </div>
                      <h1 className="text-lg text-center font-semibold !mb-3">
                        Email Verified
                      </h1>
                      <p className="text-center text-themeLight w-3/4 mx-auto">
                        Your email address is already verified. You can now back
                        to your dashboard.
                      </p>
                      <button
                        className={`!py-3 px-12 w-1/2 mx-auto !mt-10 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white font-normal text-center leading-6 ${
                          loading ? "bg-themeDarkerAlt" : "bg-themePrimary"
                        } rounded-md hover:bg-black`}
                        type="submit"
                        onClick={() => {
                          router.push("/dashboard");
                        }}
                      >
                        Dashboard
                      </button>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default VerifyEmail;
