import {oc} from '@orpc/contract';
import {z} from 'zod';

export const healthOutput = z.object({status: z.literal('ok')});

export type HealthOutput = z.infer<typeof healthOutput>;

export const healthContract = {
    check: oc.output(healthOutput),
} as const;

export type HealthContract = typeof healthContract;
