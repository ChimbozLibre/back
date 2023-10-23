import { BaseModel, belongsTo, BelongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import BacteriaGame from './BacteriaGame'

export default class Bacteria extends BaseModel {
  public static table = 'bacteria'

  @column({ isPrimary: true })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public rating: number

  @computed()
  public get win() {
    return this.$extras.win
  }

  @computed()
  public get loss() {
    return this.$extras.loss
  }

  @computed()
  public get draw() {
    return this.$extras.draw
  }

  @computed()
  public get all() {
    if (this.$extras.win && this.$extras.loss && this.$extras.draw)
      return this.$extras.win + this.$extras.loss + this.$extras.draw
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async hydrate() {
    this.$extras.win = (
      await BacteriaGame.query()
        .where('player1Id', this.userId)
        .andWhere('winner', 'PLAYER1')
        .orWhere('player2Id', this.userId)
        .andWhere('winner', 'PLAYER2')
        .select('id')
    ).length
    this.$extras.loss = (
      await BacteriaGame.query()
        .where('player1Id', this.userId)
        .andWhere('winner', 'PLAYER2')
        .orWhere('player2Id', this.userId)
        .andWhere('winner', 'PLAYER1')
        .select('id')
    ).length
    this.$extras.draw = (
      await BacteriaGame.query()
        .where('player1Id', this.userId)
        .andWhereNull('winner')
        .orWhere('player2Id', this.userId)
        .andWhereNull('winner')
        .select('id')
    ).length
  }

  public static async hydrateAll(players) {
    for (const player of players) {
      player.$extras.win = (
        await BacteriaGame.query()
          .where('player1Id', player.userId)
          .andWhere('winner', 'PLAYER1')
          .orWhere('player2Id', player.userId)
          .andWhere('winner', 'PLAYER2')
          .select('id')
      ).length
      player.$extras.loss = (
        await BacteriaGame.query()
          .where('player1Id', player.userId)
          .andWhere('winner', 'PLAYER2')
          .orWhere('player2Id', player.userId)
          .andWhere('winner', 'PLAYER1')
          .select('id')
      ).length
      player.$extras.draw = (
        await BacteriaGame.query()
          .where('player1Id', player.userId)
          .andWhereNull('winner')
          .orWhere('player2Id', player.userId)
          .andWhereNull('winner')
          .select('id')
      ).length
    }
  }
}
