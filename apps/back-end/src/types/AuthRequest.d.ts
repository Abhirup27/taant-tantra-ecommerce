import type { Request } from "express";
import { SupabaseClient } from "@supabase/supabase-js";

export default interface AuthRequest extends Request {
  supabaseInstance: SupabaseClient;
};

// declare namespace Express {
//   export interface Request {
//     supabaseInstance: SupabaseClient;
//   }
// }
declare global {
  namespace Express {
    interface Request {
      supabaseInstance: SupabaseClient;
    }
  }
}
