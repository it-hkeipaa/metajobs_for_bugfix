import axios from "axios";

export const fetcher = async (method: any, url: any, headers: any) =>
  await axios({
    method: method,
    url: url,
    headers: headers,
  }).then((res) => res);
