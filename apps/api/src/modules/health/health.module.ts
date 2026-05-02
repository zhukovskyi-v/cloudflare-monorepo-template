import { Hono } from 'hono'
import type { AppEnv } from '../../types'

const health = new Hono<AppEnv>()

health.get('/', (c) => c.json({ status: 'ok' }))

export { health }