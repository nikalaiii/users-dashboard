import { z } from 'zod';

export const listUsersQuerySchema = z.object({
  search: z.string().optional(),
});

export type ListUsersQueryDto = z.infer<typeof listUsersQuerySchema>;
