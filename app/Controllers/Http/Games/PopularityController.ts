import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { minmax } from 'App/Utils/Number'
import { DateTime } from 'luxon'
import Group from 'App/Models/Group/Group'
import Popularity from 'App/Models/Games/Popularity'
import User from 'App/Models/User'

export default class PopularityController {
  public async results({ request, response }: HttpContextContract) {
    if (!['best', 'worst'].includes(request.params().type)) return response.status(404)
    let period = request.params().period
    if (period === 'global')
      return Popularity.query()
        .preload('to', (userQuery) => userQuery.withScopes((scopes) => scopes.spotlight()))
        .withAggregate('to', (query) => {
          query.sum('points').as('points')
        })
        .sum('points')
        .orderBy('points', 'desc')
        .limit(minmax(+request.params().limit, 1, 100))
    else if (period === 'today') period = 0
    else if (period === 'yesterday') period = 1
    else if (+period >= 0 && +period <= 8) period = +period
    else
      return response.status(401).json({
        errors: [
          {
            rule: 'invalid',
            field: 'day',
            message: `Day is invalid`,
          },
        ],
      })
    return Popularity.query()
      .preload('to', (userQuery) => userQuery.withScopes((scopes) => scopes.spotlight()))
      .whereBetween('votedAt', [
        DateTime.now().minus({ day: period }).startOf('day').toSQL()!,
        DateTime.now().minus({ day: period }).endOf('day').toSQL()!,
      ])
      .withAggregate('to', (query) => {
        query.sum('points').as('points')
      })
      .sum('points')
      .orderBy('points', 'desc')
      .limit(minmax(+request.params().limit, 1, 100))
  }

  public async groups({ response }: HttpContextContract) {
    const groups = await Group.query()
      .where('isOfficial', false)
      .preload('bacteria')
      .preload('owner', (ownerQuery) => ownerQuery.select('id').preload('popularity'))
    return response.json(
      groups
        .map((group) => ({
          id: group.id,
          name: group.name,
          rating:
            group.popularity.reduce((acc, curr) => acc + (curr.points || 0), 0) +
            (group.owner.bacteria.rating || 0),
        }))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 20)
    )
  }

  public async stats({ response }: HttpContextContract) {
    return response.json({})
  }

  public async create({ request, response }: HttpContextContract) {
    const vote = await Popularity.query()
      .where('from_user_id', request.body().from_user_id)
      .whereBetween('votedAt', [
        DateTime.now().startOf('day').toSQL()!,
        DateTime.now().endOf('day').toSQL()!,
      ])
      .orWhere('ip', request.ip())
    if (vote.length)
      return response.status(401).json({
        errors: [
          {
            rule: 'already_voted',
            message: `Already voted today`,
          },
        ],
      })
    else
      Popularity.create({
        fromUserId: request.body().from_user_id,
        toUserId: request.body().to_user_id,
        points: (await User.find(request.body().from_user_id))!.level,
        ip: request.ip(),
      })
  }
}
