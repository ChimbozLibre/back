import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  hasOne,
  HasOne,
  scope,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Wedding from './Wedding'
import PrivateMessage from './PrivateMessage'
import Item from './Item'
import Friend from './Friend'
import Group from './Group/Group'
import Bacteria from './Games/Bacteria'
import Mazo from './Games/Mazo'
import Patojdur from './Games/Patojdur'
import Popularity from './Games/Popularity'
import Topic from './BBS/Topic'
import Post from './BBS/Post'
import View from './BBS/View'

export default class User extends BaseModel {
  public static table = 'users'

  public static link = scope((query) => {
    // TODO: add username color depending on group membership
    query.select(['id', 'username'])
  })

  public static spotlight = scope((query) => {
    query.select(['id', 'username', 'avatar_design'])
  })

  @column({ isPrimary: true })
  public id: number

  @column({
    meta: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
    },
  })
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({
    meta: {
      roles: ['ROLE_USER'],
    },
  })
  public rememberMeToken: string | null

  @column()
  public username: string

  @column()
  public experience: number

  @computed()
  public get level() {
    if (this.experience) return Math.log2(this.experience)
  }

  @column()
  public avatar_design: string

  @column()
  public avatar_mood:
    | 'HAPPY'
    | 'LOL'
    | 'SAD'
    | 'CRYING'
    | 'ANGRY'
    | 'BLINK'
    | 'KORBAK'
    | 'TONGUE'
    | 'LOVE'
    | 'SURPRISED'
    | 'SLEEPY'
    | 'EMBARASSED'
    | 'NEKO'
    | 'PERSEVERE'
    | 'EYES_LEFT'
    | 'CUTE'
    | 'CHAMPION'
    | 'SHARK'
    | 'SHAMEFUL'
    | 'OOPS'
    | 'PARANO'
    | 'CRAZY'
    | 'FEARFUL'
    | 'SMIRK'
    | null

  @column()
  public gender: 'MALE' | 'FEMALE' | null

  @column()
  public motto: string | null

  @column()
  public website: string | null

  @column()
  public interest1: string | null

  @column()
  public interest2: string | null

  @column()
  public interest3: string | null

  @column()
  public interest4: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Wedding)
  public weddings: HasMany<typeof Wedding>

  @hasMany(() => PrivateMessage)
  public privateMessages: HasMany<typeof PrivateMessage>

  @hasMany(() => Item)
  public items: HasMany<typeof Item>

  @hasMany(() => Friend)
  public friends: HasMany<typeof Friend>

  @hasMany(() => Group)
  public groups: HasMany<typeof Group>

  @hasOne(() => Bacteria)
  public bacteria: HasOne<typeof Bacteria>

  @hasOne(() => Mazo)
  public mazo: HasOne<typeof Mazo>

  @hasMany(() => Patojdur)
  public patojdur: HasMany<typeof Patojdur>

  @hasMany(() => Popularity, { foreignKey: 'toUserId' })
  public popularity: HasMany<typeof Popularity>

  @hasMany(() => Topic)
  public topics: HasMany<typeof Topic>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => View)
  public views: HasMany<typeof View>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
