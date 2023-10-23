import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Item from 'App/Models/Item'
import User from 'App/Models/User'

export default class Inventory extends BaseModel {
  public static table = 'inventories'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public itemId: number

  @belongsTo(() => Item)
  public item: BelongsTo<typeof Item>

  @column({ serialize: (value) => !!value })
  public locked: boolean

  @column({ serialize: (value) => JSON.parse(value) })
  public data: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
