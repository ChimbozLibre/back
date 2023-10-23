import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Forum from 'App/Models/BBS/Forum'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Forum.createMany([
      {
        name: 'Official',
        position: 0,
        bbsCategoryId: 1,
        description: 'Official description',
        isLocked: true,
        isPrivate: false,
      },
      {
        name: 'Private',
        position: 1,
        bbsCategoryId: 1,
        description: 'Private description',
        isLocked: false,
        isPrivate: true,
      },
      {
        name: 'General',
        position: 0,
        bbsCategoryId: 2,
        description: 'General description',
        isLocked: false,
        isPrivate: false,
      },
      {
        name: 'Test',
        position: 1,
        bbsCategoryId: 2,
        description: 'Test description',
        isLocked: true,
        isPrivate: true,
      },
    ])
  }
}
