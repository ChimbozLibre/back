import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Group from 'App/Models/Group/Group'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Group.createMany([
      {
        name: 'Les Créateurs',
        ownerId: 1,
        isOfficial: true,
        description: 'Salut',
        location: 'MDO',
        motto: 'Chimboz un jour, Chimboz toujours',
        status: 'CLOSED',
        type: 'EMPIRE',
        arms: '0;0;0;0',
      },
      {
        name: 'Test',
        ownerId: 2,
        status: 'ON_DEMAND',
      },
      {
        name: 'Test2',
        ownerId: 3,
        status: 'OPEN',
      },
    ])
  }
}
