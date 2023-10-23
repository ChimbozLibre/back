import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      (!Seeder.default.environment.includes('development') && Application.inDev) ||
      (!Seeder.default.environment.includes('testing') && Application.inTest) ||
      (!Seeder.default.environment.includes('production') && Application.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../User'))
    this.runSeeder(await import('../Wedding'))
    this.runSeeder(await import('../PrivateMessage'))
    this.runSeeder(await import('../Friend'))
    // Games
    this.runSeeder(await import('../Games/Mazo'))
    this.runSeeder(await import('../Games/Bacteria'))
    this.runSeeder(await import('../Games/BacteriaGame'))
    this.runSeeder(await import('../Games/Patojdur'))
    this.runSeeder(await import('../Games/Popularity'))
    // Groups
    await this.runSeeder(await import('../Group/Group'))
    this.runSeeder(await import('../Group/Member'))
    // Items
    await this.runSeeder(await import('../Item'))
    this.runSeeder(await import('../Inventory'))
    // BBS
    await this.runSeeder(await import('../BBS/Category'))
    await this.runSeeder(await import('../BBS/Forum'))
    this.runSeeder(await import('../BBS/Permission'))
    await this.runSeeder(await import('../BBS/Topic'))
    this.runSeeder(await import('../BBS/Post'))
    this.runSeeder(await import('../BBS/View'))
  }
}
