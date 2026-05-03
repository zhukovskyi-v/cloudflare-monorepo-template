import {ORPCError, os} from '@orpc/server';
import type {Context} from './context';

export type AuthUser = {
    id: string;
    email: string;
    role: string;
};

export const authMiddleware = os
    .$context<Context>()
    .middleware(async ({context, next}) => {
        const header = context.headers.get('authorization');
        const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

        if (!token) {
            throw new ORPCError('UNAUTHORIZED', {message: 'Missing bearer token'});
        }

        let payload: { sub: string; email: string; role: string };
        try {
            // parse real token to user here
            payload = {
                sub: crypto.randomUUID(),
                email: 'super@developer.com',
                role: 'developer'
            }
        } catch {
            throw new ORPCError('UNAUTHORIZED', {message: 'Invalid token'});
        }

        const user: AuthUser = {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        };

        return next({
            context: {
                ...context,
                user,
            },
        });
    });
