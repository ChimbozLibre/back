import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Bacteria from 'App/Models/Games/Bacteria'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Bacteria.createMany([
      {
        userId: 1,
        rating: 2110,
      },
      {
        userId: 2,
        rating: 2090,
      },
      {
        userId: 3,
        rating: 200,
      },
      {
        userId: 4,
        rating: 0,
      },
    ])
  }
}
