import { eq } from 'drizzle-orm'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '../../database/schema'
import { faker } from '@faker-js/faker'

type DB = DrizzleD1Database<typeof schema>

export class UsersService {
  constructor(private db: DB) {}

  async create() {
    return this.db
      .insert(schema.users)
      .values({ name: faker.internet.username() })
      .returning()
  }

  async findAll() {
    return this.db.select().from(schema.users)
  }

  async findById(id: number) {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
    return user ?? null
  }
}