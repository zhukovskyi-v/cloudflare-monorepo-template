import {usersContract} from '@repo/contracts';
import {authMiddleware, implement, type Context} from '@/lib/orpc';

const base = implement(usersContract).$context<Context>();
const priv = base.use(authMiddleware);

export const usersRouter = {
    getUser: priv.getUser.handler(async ({input, context}) => {
        const id = input.id ?? context.user.id;
        return {text: `Hello, ${id} from private greeting procedure!`};
    }),

    registerUser: base.registerUser.handler(async ({input}) => {
        const message = `Welcome ${input.name} (${input.email} — registration received.`;
        return {text: message, status: 'success'};
    }),
};

export type UsersRouter = typeof usersRouter;
