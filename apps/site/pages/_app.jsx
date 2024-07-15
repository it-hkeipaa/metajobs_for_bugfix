// Tailwind CSS
import "../styles/tailwind.css";
// React slick slider CSS
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// React Skeleton CSS
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastProvider } from "react-toast-notifications";
import LostPassword from "../src/components/register/lost-password";
import PopupLogin from "../src/components/register/popup-login";
import PopupRegister from "../src/components/register/popup-register";
import ThemeContext from "../src/context/ThemeContext";
import theme_config from "../theme_config";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  let pageTitle = router.pathname.split("/")[1];
  pageTitle =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).replace(/-/g, " ");

  const { site_name } = theme_config;

  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <ThemeContext>
          <Head>
            <title>
              {pageTitle !== "" ? pageTitle : "Home"} - {site_name}
            </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
          <PopupLogin />
          <PopupRegister />
          <LostPassword />
        </ThemeContext>
      </ToastProvider>
    </SessionProvider>
  );
}
