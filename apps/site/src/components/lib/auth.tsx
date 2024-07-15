import { localGet } from "../utils/localStore";

export function login() {
  // add localStorage to store
  localGet("UserData");
}
