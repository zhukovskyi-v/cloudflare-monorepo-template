export * from './users.contract';
export * from './health.contract';

import {usersContract} from './users.contract';
import {healthContract} from './health.contract';

export const appContract = {
    users: usersContract,
    health: healthContract,
} as const;

export type AppContract = typeof appContract;

export {z} from 'zod';
