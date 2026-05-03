import {usersContract} from '@repo/contracts';
import {implement, type Context} from '@/lib/orpc';
import { authMiddleware } from "@/middleware/auth.middleware";

const base = implement(usersContract).$context<Context>();
const priv = base.use(authMiddleware);

export const usersRouter = {
    getUser: priv.getUser.handler(async ({input}) => {
        return {text: `Hello, ${input.id} from private greeting procedure!`};
    }),

    registerUser: base.registerUser.handler(async ({input}) => {
        const message = `Welcome ${input.name} (${input.email} — registration received.`;
        return {text: message, status: 'success'};
    }),
};

export type UsersRouter = typeof usersRouter;
