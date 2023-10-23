import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Item from 'App/Models/Item'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Item.createMany([
      {
        type: 'HAT',
        rank: 'BASIC',
      },
      {
        type: 'HAT',
        rank: 'COMMON',
      },
      {
        type: 'HAT',
        rank: 'DIVINE',
      },
      {
        type: 'HAT',
        rank: 'LEGENDARY',
      },
      {
        type: 'HAT',
        rank: 'RARE',
      },
      {
        type: 'HAT',
        rank: 'RESERVED',
      },
      {
        type: 'HAT',
        rank: 'UNIQUE',
      },
      {
        type: 'AVATAR',
        rank: 'COMMON',
      },
      {
        type: 'BODY',
        rank: 'COMMON',
      },
      {
        type: 'FURNITURE',
        rank: 'COMMON',
      },
      {
        type: 'ITEM0',
        rank: 'COMMON',
      },
      {
        type: 'ITEM1',
        rank: 'COMMON',
      },
      {
        type: 'ITEM2',
        rank: 'COMMON',
      },
      {
        type: 'PET',
        rank: 'COMMON',
      },
      {
        type: 'RESOURCE',
        rank: 'COMMON',
      },
      {
        type: 'SHOE',
        rank: 'COMMON',
      },
      {
        type: 'TOOL',
        rank: 'COMMON',
      },
    ])
  }
}
