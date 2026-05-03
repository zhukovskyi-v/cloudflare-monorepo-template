import {healthContract} from '@repo/contracts';
import {implement, type Context} from '@/lib/orpc';

const base = implement(healthContract).$context<Context>();

export const healthRouter = {
    check: base.check.handler(() => ({status: 'ok' as const})),
};

export type HealthRouter = typeof healthRouter;
