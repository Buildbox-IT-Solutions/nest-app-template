import { z } from 'zod';

export const CreateUserInputSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.email('Email inválido'),
});

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
