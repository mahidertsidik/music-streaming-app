import { supabase } from "../SupabaseCLient";

const signUpUser = async (name: string, email: string, password: string) => {
  try {
    const { error,  } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (error) {
      console.log("signup error", error.message);
      return{error:error.message}
    }
    
  } catch(err) {
    console.log("unexpected error", err);
    return{error:"Something went wrong"}
  }
}
export default signUpUser;