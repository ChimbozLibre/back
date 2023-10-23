import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Group from 'App/Models/Group/Group'
import User from 'App/Models/User'

export default class Member extends BaseModel {
  public static table = 'group_members'

  @column({ isPrimary: true })
  public groupId: number

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column({ isPrimary: true })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public acceptedAt: DateTime
}
