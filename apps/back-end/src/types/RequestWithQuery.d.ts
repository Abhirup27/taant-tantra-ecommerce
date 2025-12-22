import type { Request } from "express";
import type { ZodTypeAny, infer as ZodInfer } from "zod";

export type RequestWithQuery<Q extends ZodTypeAny> =
  Request & {
    parsedQuery: ZodInfer<Q>;
  };

