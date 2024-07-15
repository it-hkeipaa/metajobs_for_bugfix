import { authAxios } from "../utils/axiosKits";

authAxios.interceptors.request.use((config) => {
  const localData = localStorage.getItem("UserData");
  if (localData) {
    const token = JSON.parse(localData);
    // @ts-ignore
    config.headers.Authorization = `Bearer ${token.accessToken}`;

    return config;
  }

  return config;
});

export default async function fetcher() {
  //sleep 400
  await new Promise((resolve) => setTimeout(resolve, 400));

  const localData = localStorage.getItem("UserData");
  if (localData) {
    // user logged in fetch user data
    const { data, error } = (await authAxios.get(`/users/retrives`)) as any;

    return {
      data: data,
      error: error,
    };
  }
  return {
    data: null,
    error: {
      message: 403,
    },
  };
}
