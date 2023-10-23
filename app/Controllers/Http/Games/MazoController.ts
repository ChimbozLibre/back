import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { minmax } from 'App/Utils/Number'
import Mazo from 'App/Models/Games/Mazo'

export default class MazoController {
  public async best({ request }: HttpContextContract) {
    return Mazo.query()
      .preload('user', (userQuery) => userQuery.withScopes((scopes) => scopes.spotlight()))
      .orderBy('score', 'desc')
      .orderBy('updated_at', 'asc')
      .limit(minmax(+request.params().limit, 1, 100))
  }

  public async create({ request }: HttpContextContract) {
    let mazo = await Mazo.findBy('user_id', request.body().user_id)
    if (mazo) {
      mazo.score = request.body().score
      mazo.save()
    } else mazo = await Mazo.create({ userId: request.body().user_id, score: request.body().score })
    return mazo
  }
}
