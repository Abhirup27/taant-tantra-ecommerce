import { createController } from "../utils/createController";
import { type Request, type Response } from "express";
import { construct_home_page_link, web_server_base_link } from "../utils/constructURL.ts";
import type AuthRequest from "../types/AuthRequest";
import { SUCCESS, type AuthService } from "../services/auth.service.ts";
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
      console.log(JSON.stringify(response.data.user.user_metadata.full_name.split(" ")[1]));
      if (response.error) {
        console.log(JSON.stringify(response.error));
      }
      else if (response.data.user.id) {
        const existing: boolean = await deps.authService.does_user_exist(response.data.user.id);
        if (existing) {
          //just store info in redis and redirect to front-end
        } else {
          // create new user in public.users
          const newUser = await deps.authService.create_user({
            id: response.data.user.id,
            email: response.data.user.email,
            phone_number: response.data.user.phone,
            first_name: response.data.user.user_metadata.full_name.split(" ")[0],
            last_name: response.data.user.user_metadata.full_name.split(" ")[1] ?? undefined,
          });

          // this may go to a middleware which runs after
          // switch (newUser) {
          //   // case SUCCESS:
          //
          // }
        }
      } else {
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
