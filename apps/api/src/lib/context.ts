import type {Context as HonoContext} from 'hono';
import type {AppEnv} from '@/types';
import {UsersService} from '@/modules/users/users.service';

export type CreateContextOptions = {
    context: HonoContext<AppEnv>;
};

export async function createContext({context: c}: CreateContextOptions) {
    const db = c.get('database');
    return {
        headers: c.req.raw.headers,
        env: c.env,
        db,
        services: {
            users: new UsersService(db),
        },
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
