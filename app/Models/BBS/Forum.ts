import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  computed,
  hasMany,
  HasMany,
  HasManyThrough,
  hasManyThrough,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/BBS/Category'
import Topic from './Topic'
import Group from '../Group/Group'
import Post from './Post'

export default class Forum extends BaseModel {
  public static table = 'bbs_forums'

  @column({ isPrimary: true })
  public id: number

  @column()
  public bbsCategoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public position: number

  @column({ serialize: (value) => !!value })
  public isPrivate: boolean

  @column({ serialize: (value) => !!value })
  public isLocked: boolean

  @hasMany(() => Topic, { foreignKey: 'bbsForumId' })
  public topics: HasMany<typeof Topic>

  @hasManyThrough([() => Post, () => Topic], {
    foreignKey: 'bbsForumId',
    throughForeignKey: 'bbsTopicId',
  })
  public posts: HasManyThrough<typeof Post>

  @computed()
  public get topics_count() {
    return this.$extras.topics_count
  }

  @computed()
  public get posts_count() {
    return this.$extras.posts_count
  }

  @manyToMany(() => Group, {
    pivotTable: 'bbs_permissions',
  })
  public moderators: ManyToMany<typeof Group>
}
