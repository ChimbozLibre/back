import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class PrivateMessage extends BaseModel {
  public static table = 'private_messages'

  @column({ isPrimary: true })
  public id: number

  @column()
  public fromUserId: number

  @belongsTo(() => User)
  public from: BelongsTo<typeof User>

  @column()
  public toUserId: number

  @belongsTo(() => User)
  public to: BelongsTo<typeof User>

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public seenAt: DateTime
}
