import type {DrizzleD1Database} from 'drizzle-orm/d1'
import * as schema from './database/schema'

export type AppEnv = {
    Bindings: Cloudflare.Env
    Variables: {
        database: DrizzleD1Database<typeof schema>
    }
}
