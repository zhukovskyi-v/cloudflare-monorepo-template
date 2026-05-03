import {oc} from '@orpc/contract';
import {z} from 'zod';

export const registerUserInput = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(40, 'Name must be 40 characters or fewer'),
    email: z.email('Enter a valid email address'),
});

export const registerUserOutput = z.object({
    text: z.string(),
    status: z.string(),
});

export const getUserInput = z.object({
    id: z.string().optional(),
});

export const getUserOutput = z.object({
    text: z.string(),
});

export type RegisterUserInput = z.infer<typeof registerUserInput>;
export type RegisterUserOutput = z.infer<typeof registerUserOutput>;
export type GetUserInput = z.infer<typeof getUserInput>;
export type GetUserOutput = z.infer<typeof getUserOutput>;

export const usersContract = {
    registerUser: oc.input(registerUserInput).output(registerUserOutput),
    getUser: oc.input(getUserInput).output(getUserOutput),
} as const;

export type UsersContract = typeof usersContract;
