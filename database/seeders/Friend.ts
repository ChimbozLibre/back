import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Friend from 'App/Models/Friend'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Friend.createMany([
      {
        fromUserId: 1,
        toUserId: 2,
        acceptedAt: DateTime.now(),
      },
      {
        fromUserId: 1,
        toUserId: 3,
      },
      {
        fromUserId: 4,
        toUserId: 1,
      },
    ])
  }
}
