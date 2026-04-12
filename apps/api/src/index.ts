import { Hono } from 'hono'
import { dbMiddleware } from './middleware/database'
import { health } from './modules/health/health.module'
import { users } from './modules/users/users.module'
import type { AppEnv } from './types'

const app = new Hono<AppEnv>()

app.use(dbMiddleware)

app.route('/health', health)
app.route('/users', users)

export default app
