import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Wedding from 'App/Models/Wedding'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Wedding.createMany([
      {
        firstMarriedUserId: 1,
        secondMarriedUserId: 2,
        firstWitnessUserId: 3,
        secondWitnessUserId: 4,
        createdAt: DateTime.fromISO('2020-01-01T00:00:00'),
        divorcedByUserId: 1,
        divorcedAt: DateTime.fromISO('2022-01-01T00:00:00'),
      },
      {
        firstMarriedUserId: 1,
        secondMarriedUserId: 2,
        firstWitnessUserId: 3,
        secondWitnessUserId: 4,
        createdAt: DateTime.fromISO('2022-01-02T00:00:00'),
      },
    ])
  }
}
