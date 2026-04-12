import { Hono } from 'hono'
import type { AppEnv } from '../../types'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const users = new Hono<AppEnv>()

// DI: resolve dependencies per request (DB comes from middleware context)
users.use(async (c, next) => {
  const service = new UsersService(c.get('database'))
  const controller = new UsersController(service)

  c.set('usersController', controller)
  await next()
})

users.post('/', (c) => c.get('usersController').create(c))
users.get('/', (c) => c.get('usersController').findAll(c))
users.get('/:id', (c) => c.get('usersController').findById(c))

export { users }