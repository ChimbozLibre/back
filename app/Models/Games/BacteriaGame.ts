import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class BacteriaGame extends BaseModel {
  public static table = 'bacteria_games'

  @column({ isPrimary: true })
  public id: number

  @column()
  public player1Id: number

  @belongsTo(() => User)
  public player1: BelongsTo<typeof User>

  @column()
  public player1Ip: string

  @column()
  public player2Id: number

  @belongsTo(() => User)
  public player2: BelongsTo<typeof User>

  @column()
  public player2Ip: string

  @column()
  public map: string

  @column()
  public start: 'PLAYER1' | 'PLAYER2'

  @column()
  public winner: 'PLAYER1' | 'PLAYER2' | null

  @column({ serialize: (value) => JSON.parse(value), prepare: (value) => JSON.stringify(value) })
  public game: string[]

  @column.dateTime({ autoCreate: true })
  public playedAt: DateTime
}
