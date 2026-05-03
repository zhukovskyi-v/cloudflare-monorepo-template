import {usersRouter} from './users/users.router';
import {healthRouter} from './health/health.router';

export const appRouter = {
    users: usersRouter,
    health: healthRouter,
};

export type AppRouter = typeof appRouter;
