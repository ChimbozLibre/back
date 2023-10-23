import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Bacteria from '../Games/Bacteria'
import Popularity from '../Games/Popularity'

export default class Group extends BaseModel {
  public static table = 'groups'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public ownerId: number

  @belongsTo(() => User, { foreignKey: 'ownerId' })
  public owner: BelongsTo<typeof User>

  @column()
  public status: 'OPEN' | 'CLOSED' | 'ON_DEMAND'

  @column()
  public type:
    | 'GROUP'
    | 'KLUB'
    | 'CLAN'
    | 'EKIP'
    | 'SKWAT'
    | 'GUILD'
    | 'ALLIANCE'
    | 'EMPIRE'
    | 'SEKT'
    | 'SKOOL'
    | 'HORD'
    | 'MEUTE'
    | 'GANG'
    | 'TRIAD'

  @column()
  public description: string

  @column()
  public motto: string

  @column()
  public arms: string

  @column()
  public location: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ serialize: (value) => !!value })
  public isOfficial: boolean

  @manyToMany(() => User, { pivotTable: 'group_members' })
  public members: ManyToMany<typeof User>

  @manyToMany(() => Bacteria, {
    pivotTable: 'group_members',
    relatedKey: 'userId',
    pivotRelatedForeignKey: 'user_id',
  })
  public bacteria: ManyToMany<typeof Bacteria>

  @manyToMany(() => Popularity, {
    pivotTable: 'group_members',
    relatedKey: 'toUserId',
    pivotRelatedForeignKey: 'to_user_id',
  })
  public popularity: ManyToMany<typeof Popularity>
}
