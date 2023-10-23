import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/BBS/Post'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Post.createMany([
      {
        bbsTopicId: 1,
        userId: 1,
        message: 'Message',
      },
      {
        bbsTopicId: 1,
        userId: 1,
        message: 'Message',
        censoredAt: DateTime.now(),
      },
      {
        bbsTopicId: 1,
        userId: 1,
        message: 'Message',
        deletedAt: DateTime.now(),
      },
      {
        bbsTopicId: 1,
        userId: 1,
        message: 'Message',
        censoredAt: DateTime.now(),
        deletedAt: DateTime.now(),
      },
      ...Array.from(Array(30).keys()).map(() => ({
        bbsTopicId: 6,
        userId: 2,
        message: 'Flood',
      })),
      ...Array.from(Array(300).keys()).map((i) => ({
        bbsTopicId: 2,
        userId: 2,
        message: 'Flood',
        createdAt: DateTime.now().minus({ hour: i }),
      })),
    ])
  }
}
