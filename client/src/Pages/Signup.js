import React from "react";
import SignupForm from "../components/SignupForm";
import LoggedOut from "../components/LoggedOut";
import { useStoreContext } from "../utils/GlobalState";
export default function Signup() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      {state.loggedIn === true && state.currentUser.role === "Admin" ? (
        <SignupForm />
      ) : (
        <LoggedOut />
      )}
    </div>
  );
}
