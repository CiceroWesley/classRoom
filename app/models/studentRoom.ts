import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import { ManyToMany } from '@adonisjs/lucid/types/relations'
import ClassRoom from './classRoom.js'

export default class StudentRoom extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

//   @column()
//   declare id_classroom: number

  @manyToMany(() => ClassRoom)
  declare classRooms: ManyToMany<typeof ClassRoom>

//   @column()
//   declare id_student: number

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}