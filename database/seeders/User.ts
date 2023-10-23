import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await User.createMany([
      {
        email: 'admin@chimboz.fr',
        username: 'admin',
        password: 'admin',
        experience: 1024,
      },
      {
        email: 'moderator@chimboz.fr',
        username: 'moderator',
        password: 'moderator',
        experience: 512,
      },
      {
        email: 'user@chimboz.fr',
        username: 'user',
        password: 'user',
        experience: 256,
      },
      {
        email: 'user2@chimboz.fr',
        username: 'user2',
        password: 'user2',
        experience: 128,
      },
    ])
  }
}
