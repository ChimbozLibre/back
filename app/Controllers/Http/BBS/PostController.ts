import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Forum from 'App/Models/BBS/Forum'
import Post from 'App/Models/BBS/Post'
import Topic from 'App/Models/BBS/Topic'
import View from 'App/Models/BBS/View'
import { DateTime } from 'luxon'

// TODO: use authentified user id
const userId = 1

export default class PostController {
  public async create({ request, response }: HttpContextContract) {
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
    if (topic.isLocked)
      return response.status(403).json({
        errors: [
          {
            rule: 'locked',
            message: `Topic with id ${topicId} is locked`,
          },
        ],
      })
    const forum = await Forum.find(topic.bbsForumId)
    if (forum!.isLocked)
      return response.status(403).json({
        errors: [
          {
            rule: 'locked',
            message: `Forum with id ${topic.bbsForumId} is locked`,
          },
        ],
      })
    const rows = await Database.from('bbs_views')
      .where('bbs_topic_id', topicId)
      .where('user_id', userId)
      .update({ viewed_at: new Date() })
    if (!rows) View.create({ bbsTopicId: topicId, userId })
    return Post.create({ message: request.body().message, bbsTopicId: topicId, userId })
  }

  public async edit({ request, response }: HttpContextContract) {
    const postId = request.params().post
    const post = await Post.find(postId)
    if (!post || post.deletedAt)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Post with id ${postId} does not exists`,
          },
        ],
      })
    if (post.message === request.body().message)
      return response.status(400).json({
        errors: [
          {
            rule: 'same_value',
            field: 'message',
            message: `Post ${postId} message is already "${request.body().message}"`,
          },
        ],
      })
    post.merge({ message: request.body().message }).save()
    return post
  }

  public async delete({ request, response }: HttpContextContract) {
    const postId = request.params().post
    const post = await Post.find(postId)
    if (!post)
      return response.status(404).json({
        errors: [
          {
            rule: 'not_found',
            field: 'id',
            message: `Post with id ${postId} does not exists`,
          },
        ],
      })
    post.merge({ deletedAt: post.deletedAt ? null : DateTime.now() }).save()
    return post
  }
}
