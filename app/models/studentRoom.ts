import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import ClassRoom from './classRoom.js'

export default class StudentRoom extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_classroom: number

  @manyToMany(() => ClassRoom, {pivotRelatedForeignKey: 'id_classroom'})
  declare classRooms: ManyToMany<typeof ClassRoom>

  @column()
  declare id_user: number

  @manyToMany(() => User, {pivotRelatedForeignKey: 'id_user'})
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}