import type { Context } from 'hono'
import type { AppEnv } from '../../types'
import type { UsersService } from './users.service'
import { BlankInput } from "hono/types"

export class UsersController {
  constructor(private service: UsersService) {}

  create = async (c: Context<AppEnv>) => {
    const result = await this.service.create()
    return c.json(result, 201)
  }

  findAll = async (c: Context<AppEnv>) => {
    const result = await this.service.findAll()
    return c.json(result)
  }

  findById = async (c: Context<AppEnv, "/:id", BlankInput>) => {
    const id = Number(c.req.param('id'))
    const result = await this.service.findById(id)
    return c.json(result)
  }
}
