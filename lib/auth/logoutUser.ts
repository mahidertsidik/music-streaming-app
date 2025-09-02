import { supabase } from "../SupabaseCLient";

const LogoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Logout error", error.message);
    return { error: error.message };
  }
};
export default LogoutUser;