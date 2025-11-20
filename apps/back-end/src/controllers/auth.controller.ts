import { createController } from "../utils/createController";
import { type Request, type Response } from "express";
import { construct_home_page_link, web_server_base_link } from "../utils/constructURL.ts";
import type AuthRequest from "../types/AuthRequest";
import type { AuthService } from "../services/auth.service.ts";
type Deps = {
  authService: AuthService
};

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
      if (response.error) {
        console.log(JSON.stringify(response.error));
      }
      else if (response.data.user.id) {
        await deps.authService.does_user_exist(response.data.user.id);
      }


      // res.redirect(303, construct_home_page_link());
      return res.redirect(303, construct_home_page_link());
    }
  }
  async function googleAuthInit(req: AuthRequest, res: Response) {
    const webServerURL = web_server_base_link();
    console.log(webServerURL);
    const { data, error } = await req.supabaseInstance.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: webServerURL + '/auth/v1/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (data.url) {
      await req.supabaseInstance.removeAllChannels();
      return res.redirect(data.url);
    }
  }
  return { callback, googleAuthInit };
})
