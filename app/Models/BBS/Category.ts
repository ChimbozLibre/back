import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Forum from 'App/Models/BBS/Forum'

export default class Category extends BaseModel {
  public static table = 'bbs_categories'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public position: number

  @hasMany(() => Forum, { foreignKey: 'bbsCategoryId' })
  public forums: HasMany<typeof Forum>
}
