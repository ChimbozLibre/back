import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Inventory from 'App/Models/Inventory'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Inventory.createMany([
      {
        itemId: 1,
        userId: 1,
      },
      {
        itemId: 1,
        userId: 1,
        data: { unusual: 'stars' },
      },
      {
        itemId: 1,
        userId: 1,
        locked: true,
      },
      {
        itemId: 1,
        userId: 1,
        createdAt: DateTime.fromISO('2020-01-01T00:00:00'),
      },
      ...Array.from(Array(17).keys()).map((id) => ({ itemId: id + 1, userId: 1 })),
    ])
  }
}
