import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class Wedding extends BaseModel {
  public static table = 'weddings'

  @column({ isPrimary: true })
  public id: number

  @column()
  public firstMarriedUserId: number

  @belongsTo(() => User)
  public firstMarried: BelongsTo<typeof User>

  @column()
  public secondMarriedUserId: number

  @belongsTo(() => User)
  public secondMarried: BelongsTo<typeof User>

  @column()
  public firstWitnessUserId: number

  @belongsTo(() => User)
  public firstWitness: BelongsTo<typeof User>

  @column()
  public secondWitnessUserId: number

  @belongsTo(() => User)
  public secondWitness: BelongsTo<typeof User>

  @column()
  public divorcedByUserId: number

  @belongsTo(() => User)
  public divorcedBy: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public divorcedAt: DateTime
}
