import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/BBS/Permission'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Permission.createMany([
      {
        bbsForumId: 1,
        groupId: 1,
      },
      {
        bbsForumId: 2,
        groupId: 1,
      },
    ])
  }
}
