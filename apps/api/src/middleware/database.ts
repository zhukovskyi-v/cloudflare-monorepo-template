import {createMiddleware} from 'hono/factory'
import {drizzle} from 'drizzle-orm/d1'
import type {AppEnv} from '../types'
import * as schema from '../database/schema'

export const dbMiddleware = createMiddleware<AppEnv>(async (c, next) => {
    c.set('database', drizzle(c.env.MAIN_API_SQL_DB, {schema}))

    await next()
})
