import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Patojdur from 'App/Models/Games/Patojdur'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Patojdur.createMany([
      {
        userId: 1,
        score: '27.123',
      },
      {
        userId: 2,
        score: '28.456',
      },
      {
        userId: 3,
        score: '29.789',
      },
    ])
  }
}
