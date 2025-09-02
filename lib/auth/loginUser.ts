// import { error } from "console";
import { supabase } from "../SupabaseCLient";

const loginUser = async (email: string, password: string) => {
  try {
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Login error", error.message);
      return { error: error.message };
    }
  } catch (err) {
    console.log("unexpected error", err);
    return { error: "Something went wrong" };
  }
};
export default loginUser;
