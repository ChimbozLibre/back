import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Mazo from 'App/Models/Games/Mazo'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Mazo.createMany([
      {
        userId: 1,
        score: 1,
      },
      {
        userId: 2,
        score: 3,
      },
      {
        userId: 3,
        score: 6,
      },
    ])
  }
}
