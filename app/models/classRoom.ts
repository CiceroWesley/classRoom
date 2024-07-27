import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class ClassRoom extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare number: number

  @column()
  declare capacity: number

  @column()  
  declare availability: boolean

//   @column()
//   declare user_id: number;

  @hasOne(() => User, {})
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}