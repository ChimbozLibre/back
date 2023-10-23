import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class UsersController {
  public async me({ auth, response }: HttpContextContract) {
    await auth.use('api').authenticate()

    return response.ok(auth.use('api').user!)
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateUser)
      const user = await User.create(data)
      return response.created(user)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours',
      })
      const user = auth.user!

      return response.ok({
        token: token,
        ...user.serialize(),
      })
    } catch (error) {
      return response.badRequest({
        errors: [
          {
            rule: 'email',
            field: 'email',
            message: 'Veuillez vérifier vos informations de connexion',
          },
        ],
      })
    }
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  public async delete() {
    return { hello: 'World' }
  }

  public async update() {
    return { hello: 'World' }
  }

  public async find() {
    return { hello: 'World' }
  }

  public async findAll() {
    return { hello: 'World' }
  }

  public async findById() {
    return { hello: 'World' }
  }
}
