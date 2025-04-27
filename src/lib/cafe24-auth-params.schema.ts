import { z } from "zod";

export const Cafe24AuthParamsSchema = z.object({
  lang: z.string(),
  mall_id: z.string(),
  nation: z.string(),
  shop_no: z.string(),
  timestamp: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  user_type: z.string(),
  hmac: z.string(),
});
