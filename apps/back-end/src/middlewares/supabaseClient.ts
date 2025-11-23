// import { createClient } from "@supabase/supabase-js";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { config } from "common";
import type { NextFunction, Response } from "express";
import type AuthRequest from "../types/AuthRequest";


const g_supabase_url = config.SUPABASE_URL;
const g_supabase_key = config.SUPABASE_KEY;
//const supabase = createClient(supabaseUrl, supabaseKey);

const create_supabase_instance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  req.supabaseInstance = await createServerClient(g_supabase_url, g_supabase_key,
    {
      auth: {
        flowType: 'pkce',
      },
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.cookie ?? '')
        },
        setAll(cookiesToSet) { cookiesToSet.forEach(async ({ name, value, options }) => await res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))) },
      },
    });

  next();
}
export { create_supabase_instance };

