import type { DrizzleD1Database } from 'drizzle-orm/d1'
import type { UsersController } from './modules/users/users.controller'
import * as schema from './database/schema'

export type AppEnv = {
    Bindings: Cloudflare.Env
    Variables: {
        database: DrizzleD1Database<typeof schema>
        usersController: UsersController
    }
}
