import type { Request, Response, NextFunction, RequestHandler } from "express";
import { treeifyError, type ZodType } from "zod";

export function parse_Request_Query<Q extends ZodType>(
  schema: Q,
  handler: (
    req: Request & { parsedQuery: import("zod").infer<Q> },
    res: Response
  ) => any

): RequestHandler {
  return function (
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const parsed = schema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json(treeifyError(parsed.error));
    }

    (req as any).parsedQuery = parsed.data;
    return handler(req as any, res);
  };
}

