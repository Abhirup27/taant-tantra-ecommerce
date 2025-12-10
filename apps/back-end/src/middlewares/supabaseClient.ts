// import { createClient } from "@supabase/supabase-js";
import { createServerClient, type CookieMethodsServer, type CookieOptions, } from "@supabase/ssr";
import { config } from "common";
import type { NextFunction, Response } from "express";
import type AuthRequest from "../types/AuthRequest.js";
// import type { SupabaseClientOptions } from "@supabase/supabase-js";
import type { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types.js";


const g_supabase_url = config.SUPABASE_URL;
const g_supabase_key = config.SUPABASE_KEY;
//const supabase = createClient(supabaseUrl, supabaseKey);

// type CookieSerializeOptions = {
//   maxAge?: number;
//   domain?: string;
//   path?: string;
//   expires?: Date;
//   httpOnly?: boolean;
//   secure?: boolean;
//   sameSite?: "strict" | "lax" | "none";
// };

export function serializeCookieHeader(
  name: string,
  value: string,
  options: CookieOptions = {}
): string {
  // Encode name/value to avoid unsafe characters
  const encodedName = encodeURIComponent(name);
  const encodedValue = encodeURIComponent(value);

  let header = `${encodedName}=${encodedValue}`;

  if (options.maxAge !== undefined) {
    header += `; Max-Age=${Math.floor(options.maxAge)}`;
  }

  if (options.domain) {
    header += `; Domain=${options.domain}`;
  }

  if (options.path) {
    header += `; Path=${options.path}`;
  }

  if (options.expires) {
    header += `; Expires=${options.expires.toUTCString()}`;
  }

  if (options.httpOnly) {
    header += `; HttpOnly`;
  }

  if (options.secure) {
    header += `; Secure`;
  }

  if (options.sameSite) {
    // Capitalize correctly
    const map: Record<string, string> = {
      strict: "Strict",
      lax: "Lax",
      none: "None",
    };
    if (typeof options.sameSite != "boolean") {

      header += `; SameSite=${map[options.sameSite]}`;
    } else {

      header += `; SameSite=true`;
    }
  }

  return header;
}

export function parseCookies(header: string | null | undefined):
  Array<{ name: string; value: string }> | null {
  if (!header || !header.trim()) return null;

  const parts = header.split(";").map(p => p.trim());
  const cookies: Array<{ name: string; value: string }> = [];

  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue; // skip invalid segments

    const name = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();

    if (!name) continue;

    cookies.push({ name, value });
  }

  return cookies.length > 0 ? cookies : null;
}

interface SupabaseConfig {
  auth?: {
    flowType: SupabaseAuthClientOptions['flowType'],
  },
  cookies: CookieMethodsServer,

};

const create_supabase_instance = (req: AuthRequest, res: Response, next: NextFunction): void => {

  const supabaseConfig: SupabaseConfig = {
    auth: {
      flowType: 'pkce'
    },
    cookies: {
      getAll() {
        return parseCookies(req.headers.cookie! ?? '')
      },
      setAll(cookiesToSet) {
        if (res.headersSent) return;

        for (const { name, value, options } of cookiesToSet) {
          // console.log(name, value, options);
          res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options));
        }
      }
    },

  }
  req.supabaseInstance = createServerClient<any, "public">(g_supabase_url, g_supabase_key,
    supabaseConfig);

  next();
}
export { create_supabase_instance };

