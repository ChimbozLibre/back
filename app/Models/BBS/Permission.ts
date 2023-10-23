import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Forum from './Forum'
import Group from '../Group/Group'

export default class Category extends BaseModel {
  public static table = 'bbs_permissions'

  @column({ isPrimary: true })
  public groupId: number

  @belongsTo(() => Group)
  public groups: BelongsTo<typeof Group>

  @column({ isPrimary: true })
  public bbsForumId: number

  @belongsTo(() => Forum)
  public forums: BelongsTo<typeof Forum>
}
