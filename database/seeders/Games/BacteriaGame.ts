import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BacteriaGame from 'App/Models/Games/BacteriaGame'
import { randomValue, random } from 'App/Utils/Number'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await BacteriaGame.createMany([
      ...Array.from(Array(1000).keys()).map((id) => ({
        player1Id: id % 2 ? random(1, 2) : random(3, 4),
        player1Ip: '127.0.0.1',
        player2Id: id % 2 ? random(3, 4) : random(1, 2),
        player2Ip: '127.0.0.2',
        map: '1000000000000000000000000000000000000000000000000000000000000002',
        start: randomValue(['PLAYER1', 'PLAYER2']),
        winner: randomValue(['PLAYER1', 'PLAYER2', null]),
        game: ['a1', 'b2'],
        playedAt: DateTime.now().minus(random(0, 345600000)),
      })),
    ])
  }
}
