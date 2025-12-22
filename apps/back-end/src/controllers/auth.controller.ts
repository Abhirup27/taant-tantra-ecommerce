import { create_Controller } from "../utils/createController.js";
import { type Response } from "express";
import { construct_home_page_link, web_server_base_link } from "../utils/constructURL.js";
import type AuthRequest from "../types/AuthRequest.d.ts";
import { type AuthService } from "../services/auth.service.js";
import { z } from "zod";


export type AuthController = ReturnType<typeof create_Auth_Controller>;

type Deps = {
  authService: AuthService
};
export const LoginSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one digit")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one symbol")
})

export type LoginBody = z.infer<typeof LoginSchema>;

export const create_Auth_Controller = create_Controller((deps: Deps) => {

  async function f_email_Sign_In(req: AuthRequest, res: Response) {

    const validation = LoginSchema.safeParse(req.body);
    console.log('here');
    if (!validation.success) {
      res.status(400).json({
        error: "invalid request body",
        details: z.treeifyError(validation.error)
      });
    } else {
      const data: LoginBody = validation.data;

      // try {
      //
      //   const result = await req.supabaseInstance.auth.signInWithPassword({
      //     email: data.email,
      //     password: data.password
      //   });
      //   console.log(result);
      // } catch (error) {
      //   console.log(error);
      // }


      return res.json({
        data
      });
    }

  }
  async function f_callback(req: AuthRequest, res: Response) {
    // console.log(req.cookies, req.params
    //   , req.query);

    const code: string = req.query.code as string; // need to check this later
    // const next = req.query.next ?? '/';

    console.log(code);
    // console.log(req.cookies);
    if (code) {// need to  check this in the middleware which would run before the instance is created

      const response = await req.supabaseInstance.auth.exchangeCodeForSession(code);
      console.log(response);
      if (response.error) {
        console.log(JSON.stringify(response.error));
      }
      else if (response.data.user.id) {
        const existing: boolean = await deps.authService.does_user_exist(response.data.user.id);
        console.log(response.data.user.phone);
        if (existing) {
          //just store info in redis and redirect to front-end
        } else {
          // create new user in public.users
          // const newUser =
          await deps.authService.create_user({
            id: response.data.user.id,
            email: response.data.user.email == '' ? undefined : response.data.user.email,
            phone_number: response.data.user.phone == '' ? undefined : response.data.user.phone,
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
  async function f_google_Auth_Init(req: AuthRequest, res: Response) {
    const webServerURL = web_server_base_link();
    // console.log(webServerURL);
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
    if (error) {
      console.error(error);
    }
    if (data.url) {
      // await req.supabaseInstance.removeAllChannels();
      return await res.redirect(data.url);
    }
  }
  return { f_callback, f_google_Auth_Init, f_email_Sign_In };
})
