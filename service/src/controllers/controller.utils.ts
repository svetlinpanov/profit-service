import { ParameterizedContext } from "koa";
import { input, output, z } from "zod";
import { logger } from "../system";
import { fromZodError } from "zod-validation-error";

export function validateRequest<
  B extends z.ZodTypeAny,
  Q extends z.ZodTypeAny,
  P extends z.ZodTypeAny,
  H extends z.ZodTypeAny,
>(
  ctx: ParameterizedContext,
  { body, query, params, headers }: { body?: B; query?: Q; params?: P; headers?: H },
) {
  if (body instanceof z.ZodObject) {
    body = body.strict() as unknown as B;
  }
  if (query instanceof z.ZodObject) {
    query = query.strict() as unknown as Q;
  }
  if (params instanceof z.ZodObject) {
    params = params.strict() as unknown as P;
  }

  return {
    body: body?.parse(ctx.request.body) as output<B>,
    query: query?.parse(ctx.request.query) as output<Q>,
    params: params?.parse(ctx.params) as output<P>,
    headers: headers?.parse(ctx.header) as output<H>,
  };
}
export const setResponse = <D extends z.ZodTypeAny>(
  ctx: ParameterizedContext,
  dataSchema: D,
  data: input<D>,
) => {
  const parsed = dataSchema.safeParse(data);
  if (!parsed.success) {
    logger.warn("Invalid response data", fromZodError(parsed.error), data);
  }

  ctx.body = {
    data: parsed.success ? parsed.data : data,
    status: 200,
  };
  ctx.status = 200;
};
