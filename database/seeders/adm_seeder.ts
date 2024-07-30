import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Adm',
      email: 'adm@bol.com.br',
      password: '1234',
      registration: 1,
      date_of_birth: '30/07/2000',
      type: 0
    })
  }
}