import { createController } from "../utils/createController";
import { type Request, type Response } from "express";
import { construct_home_page_link, web_server_base_link } from "../utils/constructURL.ts";
import type AuthRequest from "../types/AuthRequest";
type Deps = {};

export const createAuthController = createController((deps: Deps) => {
  async function callback(req: AuthRequest, res: Response) {
    console.log(req.cookies, req.params
      , req.query);

    const code: string = req.query.code as string; // need to check this later
    const next = req.query.next ?? '/';

    console.log(code);
    console.log(req.cookies);
    if (code) {// need to  check this in the middleware which would run before the instance is created

      const response = await req.supabaseInstance.auth.exchangeCodeForSession(code);
      console.log(JSON.stringify(response));

    }
    // res.redirect(303, construct_home_page_link());
    return res.redirect(303, construct_home_page_link());
  }

  async function discordAuthInit(req: AuthRequest, res: Response) {
    const webServerURL = web_server_base_link();
    console.log(webServerURL);
    const { data, error } = await req.supabaseInstance.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: webServerURL + '/auth/callback',
        queryParams: {
          scope: "identify guilds.join email"
        }
      }
    });
    if (data.url) {
      await req.supabaseInstance.removeAllChannels();
      return res.redirect(data.url);
    }
  }
  return { callback, discordAuthInit };
})
