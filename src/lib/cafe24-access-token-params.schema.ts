import { z } from "zod";

export const Cafe24AccessTokenParamsSchema = z.object({
  code: z.string(),
  state: z.string(),
});
