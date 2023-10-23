import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Topic from 'App/Models/BBS/Topic'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  public static table = 'bbs_posts'

  @column({ isPrimary: true })
  public id: number

  @column()
  public bbsTopicId: number

  @belongsTo(() => Topic)
  public topic: BelongsTo<typeof Topic>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public censoredAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null
}
