import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bacteria from 'App/Models/Games/Bacteria'
import BacteriaGame from 'App/Models/Games/BacteriaGame'
import { minmax } from 'App/Utils/Number'
import { DateTime } from 'luxon'
import { getResults } from 'App/Utils/Elo'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BacteriaController {
  public async best({ request }: HttpContextContract) {
    return Bacteria.query()
      .preload('user', (userQuery) => userQuery.withScopes((scopes) => scopes.spotlight()))
      .orderBy('rating', 'desc')
      .limit(minmax(+request.params().limit, 1, 100))
  }

  public async worst({ request }: HttpContextContract) {
    const players = await Bacteria.query()
      .preload('user', (userQuery) => userQuery.withScopes((scopes) => scopes.spotlight()))
      .orderBy('rating', 'asc')
      .limit(minmax(+request.params().limit, 1, 100))
    await Bacteria.hydrateAll(players)
    return players
  }

  public async records({ response }: HttpContextContract) {
    const players = await Bacteria.query().preload('user', (userQuery) =>
      userQuery.withScopes((scopes) => scopes.link())
    )
    await Bacteria.hydrateAll(players)
    return response.json({
      played: players.reduce((prev, current) => (prev.all > current.all ? prev : current)),
      win: players.reduce((prev, current) => (prev.win > current.win ? prev : current)),
      loss: players.reduce((prev, current) => (prev.loss > current.loss ? prev : current)),
      draw: players.reduce((prev, current) => (prev.draw > current.draw ? prev : current)),
    })
  }

  public async groups({ request }: HttpContextContract) {
    return (
      await Database.rawQuery(
        `select
        id, name,
        (
        select
          sum(rating) + owner.rating
        from
          bacteria
        inner join group_members on
          bacteria.user_id = group_members.user_id
        where
          (accepted_at is not null)
          and (groups.id = group_members.group_id)) as bacteria_rating
      from
        groups
      inner join bacteria owner on
        owner.user_id = groups.owner_id
      where
        is_official = false
      order by
        bacteria_rating desc
      limit :limit`,
        { limit: minmax(+request.params().limit, 1, 100) }
      )
    )[0].map((g) => ({ ...g, bacteria_rating: +g.bacteria_rating }))
  }

  public async stats({ response }: HttpContextContract) {
    return response.json({
      players: (await Bacteria.query().select('user_id')).length,
      today: (
        await BacteriaGame.query()
          .whereBetween('playedAt', [
            DateTime.now().startOf('day').toSQL()!,
            DateTime.now().endOf('day').toSQL()!,
          ])
          .select('id')
      ).length,
      yesterday: (
        await BacteriaGame.query()
          .whereBetween('playedAt', [
            DateTime.now().minus({ day: 1 }).startOf('day').toSQL()!,
            DateTime.now().minus({ day: 1 }).endOf('day').toSQL()!,
          ])
          .select('id')
      ).length,
    })
  }

  public async create({ request }: HttpContextContract) {
    const game = request.body() as BacteriaGame
    let player1 = await Bacteria.find(game.player1Id)
    let player2 = await Bacteria.find(game.player2Id)
    if (!player1) player1 = await Bacteria.create({ userId: game.player1Id })
    if (!player2) player2 = await Bacteria.create({ userId: game.player2Id })
    const gains = getResults(player1.rating, player2.rating, game.winner)
    player1.rating += gains[0]
    player2.rating += gains[1]
    const trx = await Database.transaction()
    player1.save()
    player2.save()
    BacteriaGame.create(game)
    if (!trx.isCompleted) await trx.commit()
    await player1.hydrate()
    await player2.hydrate()
    return [
      { ...player1.serialize(), gain: gains[0] },
      { ...player2.serialize(), gain: gains[1] },
    ]
  }
}
