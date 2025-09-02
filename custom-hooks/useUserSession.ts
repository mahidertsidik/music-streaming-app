"use client"
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/SupabaseCLient";
export default function useUserSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const {  data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };


    const {
      data: { subscription }} = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    fetchSession();
    return () => subscription.unsubscribe();
  }, []);
  return { session, loading };
}
