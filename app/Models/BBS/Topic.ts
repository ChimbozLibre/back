import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  computed,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Forum from 'App/Models/BBS/Forum'
import User from 'App/Models/User'
import Post from './Post'

export default class Topic extends BaseModel {
  public static table = 'bbs_topics'

  @column({ isPrimary: true })
  public id: number

  @column()
  public bbsForumId: number

  @belongsTo(() => Forum, { foreignKey: 'bbsForumId' })
  public forum: BelongsTo<typeof Forum>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public name: string

  @column()
  public views: number

  @column()
  public type: 'ANNOUNCE' | 'POST-IT' | null

  @column({ serialize: (value) => !!value })
  public isLocked: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasMany(() => Post, { foreignKey: 'bbsTopicId' })
  public posts: HasMany<typeof Post>

  @computed()
  public get posts_count() {
    return this.$extras.posts_count
  }
}
