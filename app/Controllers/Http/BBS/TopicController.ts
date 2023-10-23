import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Forum from 'App/Models/BBS/Forum'
import Post from 'App/Models/BBS/Post'
import Topic from 'App/Models/BBS/Topic'
import { DateTime } from 'luxon'

// TODO: use authentified user id
const userId = 1

export default class TopicController {
  public async show({ request, response }: HttpContextContract) {
    const topicId = request.params().topic
    const topic = await Topic.find(topicId)
    if (!topic || topic.deletedAt)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Topic with id ${topicId} does not exists`,
          },
        ],
      })
    topic.load('forum')

    // Increment views
    topic.merge({ views: topic.views + 1 }).save()

    await Database.from('bbs_views')
      .where('bbs_topic_id', topicId)
      .where('user_id', userId)
      .update({ viewed_at: new Date() })

    const posts = await Post.query()
      .where('bbs_topic_id', topicId)
      .preload('user', (userQuery) =>
        userQuery.select(['id', 'username', 'avatar_design', 'motto'])
      )
      .paginate(request.qs().page ?? 1)
    return response.json({
      ...topic.serialize(),
      meta: posts.getMeta(),
      posts: posts.all(),
    })
  }

  public async create({ request, response }: HttpContextContract) {
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
    if (forum.isLocked)
      return response.status(403).json({
        errors: [
          {
            rule: 'locked',
            message: `Forum with id ${forumId} is locked`,
          },
        ],
      })
    const topic = await Topic.create({ name: request.body().name, bbsForumId: forumId, userId })
    topic.related('posts').create({ message: request.body().message, userId })
    return topic
  }

  public async lock({ request, response }: HttpContextContract) {
    const topicId = request.params().topic
    const topic = await Topic.find(topicId)
    if (!topic || topic.deletedAt)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Topic with id ${topicId} does not exists`,
          },
        ],
      })
    topic.merge({ isLocked: !topic.isLocked }).save()
    return topic
  }

  public async delete({ request, response }: HttpContextContract) {
    const topicId = request.params().topic
    const topic = await Topic.find(topicId)
    if (!topic)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Topic with id ${topicId} does not exists`,
          },
        ],
      })
    topic.merge({ deletedAt: topic.deletedAt ? null : DateTime.now() }).save()
    return topic
  }

  public async move({ request, response }: HttpContextContract) {
    const topicId = request.params().topic
    const topic = await Topic.find(topicId)
    if (!topic || topic.deletedAt)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Topic with id ${topicId} does not exists`,
          },
        ],
      })
    if (topic.bbsForumId === request.body().bbs_forum_id)
      return response.status(400).json({
        errors: [
          {
            rule: 'same_value',
            field: 'bbs_forum_id',
            message: `Topic is already in forum ${topic.bbsForumId}`,
          },
        ],
      })
    topic.merge({ bbsForumId: request.body().bbs_forum_id }).save()
    return topic
  }

  public async type({ request, response }: HttpContextContract) {
    const topicId = request.params().topic
    const topic = await Topic.find(topicId)
    if (!topic || topic.deletedAt)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Topic with id ${topicId} does not exists`,
          },
        ],
      })
    if (topic.type === request.body().type)
      return response.status(400).json({
        errors: [
          {
            rule: 'same_value',
            field: 'type',
            message: `Topic ${topicId} is already of type ${request.body().type}`,
          },
        ],
      })

    if (!['ANNOUNCE', 'POST-IT', null].includes(request.body().type))
      return response.status(400).json({
        errors: [
          {
            rule: 'bad_value',
            field: 'type',
            message: `Type ${request.body().type} is not 'ANNOUNCE' | 'POST-IT' | null`,
          },
        ],
      })
    topic.merge({ type: request.body().type }).save()
    return topic
  }
}
