/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  // User
  Route.group(() => {
    Route.post('/', 'UsersController.create')
    Route.get('/me', 'UsersController.me').middleware('auth:api')
    Route.post('/login', 'UsersController.login')
    Route.post('/logout', 'UsersController.logout')
  }).prefix('/user')

  // BBS
  Route.group(() => {
    // Index
    Route.get('/', 'BBS/CategoryController.index')
    //Forum
    Route.group(() => {
      Route.get('/:forum', 'BBS/ForumController.show')
      Route.patch('/:forum/lock', 'BBS/ForumController.lock')
      Route.post('/:forum/topic', 'BBS/TopicController.create')
    }).prefix('/forum')
    // Topic
    Route.group(() => {
      Route.get('/:topic', 'BBS/TopicController.show')
      Route.patch('/:topic/lock', 'BBS/TopicController.lock')
      Route.delete('/:topic', 'BBS/TopicController.delete')
      Route.patch('/:topic/move', 'BBS/TopicController.move')
      Route.patch('/:topic/type', 'BBS/TopicController.type')
      Route.post('/:topic/post', 'BBS/PostController.create')
    }).prefix('/topic')
    //Post
    Route.group(() => {
      Route.patch('/:post/edit', 'BBS/PostController.edit')
      Route.delete('/:post', 'BBS/PostController.delete')
    }).prefix('/post')
  }).prefix('/bbs')

  // Games
  Route.group(() => {
    // Bacteria
    Route.group(() => {
      Route.get('/best/:limit', 'Games/BacteriaController.best')
      Route.get('/worst/:limit', 'Games/BacteriaController.worst')
      Route.get('/groups/:limit', 'Games/BacteriaController.groups')
      Route.get('/records', 'Games/BacteriaController.records')
      Route.get('/stats', 'Games/BacteriaController.stats')
      Route.post('/', 'Games/BacteriaController.create')
    }).prefix('/bacteria')
    // Mazo
    Route.group(() => {
      Route.get('/best/:limit', 'Games/MazoController.best')
      Route.post('/', 'Games/MazoController.create')
    }).prefix('/mazo')
    // Patojdur
    Route.group(() => {
      Route.get('/', 'Games/PatojdurController.index')
    }).prefix('/patojdur')
    // Popularity
    Route.group(() => {
      Route.get('/:type/groups/:limit', 'Games/PopularityController.groups')
      Route.get('/:type/:period/:limit', 'Games/PopularityController.results')
      Route.get('/stats/:period', 'Games/PopularityController.stats')
      Route.post('/', 'Games/PopularityController.create')
    }).prefix('/popularity')
  }).prefix('/games')
}).prefix('/api/v1')
