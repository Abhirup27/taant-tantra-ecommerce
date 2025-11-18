import type { Request } from "express";
import { SupabaseClient } from "@supabase/supabase-js";

export default interface AuthRequest extends Request {
  supabaseInstance: SupabaseClient;
};
