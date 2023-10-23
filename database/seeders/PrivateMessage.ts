import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PrivateMessage from 'App/Models/PrivateMessage'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await PrivateMessage.createMany([
      {
        fromUserId: 1,
        toUserId: 2,
        message: 'Salut',
        seenAt: DateTime.now(),
      },
      {
        fromUserId: 2,
        toUserId: 1,
        message: 'Salut ça va?',
        seenAt: DateTime.now(),
      },
      {
        fromUserId: 1,
        toUserId: 2,
        message: 'Oui et toi?',
        seenAt: DateTime.now(),
      },
      {
        fromUserId: 2,
        toUserId: 1,
        message: 'Oui :)',
        seenAt: DateTime.now(),
      },
      {
        fromUserId: 1,
        toUserId: 3,
        message: 'Hé',
        seenAt: DateTime.now(),
      },
      {
        fromUserId: 3,
        toUserId: 1,
        message: 'Hé',
      },
    ])
  }
}
