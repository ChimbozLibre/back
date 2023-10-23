import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Member from 'App/Models/Group/Member'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Member.createMany([
      {
        userId: 2,
        groupId: 1,
        acceptedAt: DateTime.now(),
      },
      {
        userId: 3,
        groupId: 1,
      },
      {
        userId: 1,
        groupId: 2,
      },
      {
        userId: 1,
        groupId: 3,
        acceptedAt: DateTime.now(),
      },
    ])
  }
}
