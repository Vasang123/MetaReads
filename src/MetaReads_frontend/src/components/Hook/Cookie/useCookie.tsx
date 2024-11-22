import { Principal } from "@dfinity/principal";
import { useUserById } from "../Data/User/useUserById";
import { User } from "../../Props/userProps";
import { UserModel } from "../../Props/model";

export const useCookie = () => {
  function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function getIdentityfromCookie(): Promise<UserModel | null> {
    const { getUserById } = useUserById();
    let name = "identity=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        const internetIdentityId = c.substring(name.length, c.length);
        const user = await getUserById(Principal.fromText(internetIdentityId));
        if ("Err" in user) {
          return null;
        }
        return user.Ok;
      }
    }
    return null;
  }
  return { getCookie, getIdentityfromCookie };
};
