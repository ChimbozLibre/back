import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class Popularity extends BaseModel {
  public static table = 'popularity'

  @column()
  public fromUserId: number

  @belongsTo(() => User, { foreignKey: 'fromUserId' })
  public from: BelongsTo<typeof User>

  @column()
  public toUserId: number

  @belongsTo(() => User, { foreignKey: 'toUserId' })
  public to: BelongsTo<typeof User>

  @column()
  public points: number

  @column({
    meta: {
      roles: ['ROLE_ADMIN'],
    },
  })
  public ip: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public votedAt: DateTime
}
