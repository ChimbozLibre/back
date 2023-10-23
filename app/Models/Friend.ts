import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class Friend extends BaseModel {
  public static table = 'friends'

  @column({ isPrimary: true })
  public fromUserId: number

  @belongsTo(() => User)
  public from: BelongsTo<typeof User>

  @column({ isPrimary: true })
  public toUserId: number

  @belongsTo(() => User)
  public to: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public invitedAt: DateTime

  @column.dateTime()
  public acceptedAt: DateTime
}
