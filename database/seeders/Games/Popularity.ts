import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Popularity from 'App/Models/Games/Popularity'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Popularity.createMany([
      {
        fromUserId: 1,
        toUserId: 2,
        points: 4,
        ip: '127.0.0.1',
      },
      {
        fromUserId: 2,
        toUserId: 1,
        points: -2,
        ip: '127.0.0.1',
      },
      {
        fromUserId: 3,
        toUserId: 2,
        points: 2,
        ip: '127.0.0.2',
      },
    ])
  }
}
