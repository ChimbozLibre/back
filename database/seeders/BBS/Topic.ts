import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Topic from 'App/Models/BBS/Topic'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Topic.createMany([
      {
        name: 'Announce',
        bbsForumId: 1,
        type: 'ANNOUNCE',
        userId: 1,
      },
      {
        name: 'Topic',
        bbsForumId: 1,
        userId: 1,
      },
      {
        name: 'Post-it',
        bbsForumId: 2,
        userId: 2,
        type: 'POST-IT',
      },
      {
        name: 'Private topic',
        bbsForumId: 2,
        userId: 1,
        isLocked: true,
      },
      {
        name: 'Salut',
        bbsForumId: 3,
        userId: 3,
      },
      {
        name: 'Test',
        bbsForumId: 4,
        userId: 1,
      },
      ...Array.from(Array(300).keys()).map(() => ({
        name: 'Flood',
        bbsForumId: 1,
        userId: 1,
      })),
    ])
  }
}
