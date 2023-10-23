import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/BBS/Forum'
import Topic from 'App/Models/BBS/Topic'

export default class ForumController {
  public async show({ request, response }: HttpContextContract) {
    const forumId = request.params().forum
    const forum = await Forum.find(forumId)
    if (!forum)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Forum with id ${forumId} does not exists`,
          },
        ],
      })
    const topics = await Topic.query()
      .where('bbs_forum_id', forumId)
      .preload('user', (userQuery) => userQuery.withScopes((scopes) => scopes.link()))
      .withCount('posts')
      .paginate(request.qs().page ?? 1)
    return response.json({
      ...forum.serialize({
        fields: {
          pick: ['id', 'name', 'is_private', 'is_locked'],
        },
      }),
      meta: topics.getMeta(),
      topics: topics.all(),
    })
  }

  public async lock({ request, response }: HttpContextContract) {
    const forumId = request.params().forum
    const forum = await Forum.find(forumId)
    if (!forum)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Forum with id ${forumId} does not exists`,
          },
        ],
      })
    forum.isLocked = !forum.isLocked
    forum.save()
    return forum
  }
}
