import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Topic from 'App/Models/BBS/Topic'
import User from 'App/Models/User'

export default class View extends BaseModel {
  public static table = 'bbs_views'

  @column()
  public bbsTopicId: number

  @belongsTo(() => Topic, { foreignKey: 'bbs_topic_id' })
  public topic: BelongsTo<typeof Topic>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public viewedAt: DateTime
}
