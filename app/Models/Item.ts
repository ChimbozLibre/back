import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Item extends BaseModel {
  public static table = 'items'

  @column({ isPrimary: true })
  public id: number

  @column()
  public rank: 'COMMON' | 'BASIC' | 'RARE' | 'UNIQUE' | 'LEGENDARY' | 'DIVINE' | 'RESERVED'

  @column()
  public type:
    | 'HAT'
    | 'BODY'
    | 'SHOE'
    | 'ITEM0'
    | 'ITEM1'
    | 'ITEM2'
    | 'FURNITURE'
    | 'AVATAR'
    | 'TOOL'
    | 'RESOURCE'
    | 'PET'

  @manyToMany(() => User)
  public owners: ManyToMany<typeof User>
}
