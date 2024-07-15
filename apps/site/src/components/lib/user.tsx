import { useRouter } from "next/router";
import React from "react";
import { Loader } from "./loader";

export const UserNotLogin = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/login");
  }, [router]);
  return <Loader />;
};

export const UserGoBack = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.back();
  }, []);
  return <Loader />;
};

export const UserLogin = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(
      router.query?.callbackUrl
        ? (router.query?.callbackUrl as string)
        : "/dashboard",
    );
  }, [router]);
  return <Loader />;
};
