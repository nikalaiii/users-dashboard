import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  company: z.string().min(1),
  adress: z.string().min(1),
  city: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
