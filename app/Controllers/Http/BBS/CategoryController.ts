import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/BBS/Category'

export default class CategoryController {
  public async index({}: HttpContextContract) {
    return await Category.query()
      .preload('forums', (forumQuery) => {
        forumQuery.withCount('topics')
        forumQuery.withCount('posts')
        forumQuery.preload('posts', (postQuery) =>
          postQuery
            .orderBy('createdAt')
            .limit(1)
            .preload('user', (userQuery) => userQuery.withScopes((scopes) => scopes.link()))
        )
      })
      .orderBy('position', 'desc')
  }
}
