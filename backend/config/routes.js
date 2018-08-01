/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'POST /login'                     :   { action: 'account/login'  },
  'POST /logout'                    :   { action: 'account/logout' },
  'POST /signup'                    :   { action: 'account/signup' },
  
  'GET /project'                    :   { action: 'project/list-projects' },
  'POST /project'                   :   { action: 'project/add-project' },
  'GET /project/:id'                :   { action: 'project/get-project' },
  'PUT /project/:id'                :   { action: 'project/update-project' },
  'DELETE /project/:id'             :   { action: 'project/delete-project' },

  'GET /task'                       :   { action: 'task/list-tasks' },
  'POST /task'                      :   { action: 'task/add-task' },
  'GET /task/:id'                   :   { action: 'task/get-task' },
  'PUT /task/:id'                   :   { action: 'task/update-task' },
  'DELETE /task/:id'                :   { action: 'task/delete-task' },
  
  'GET /user'                       :   { action: 'user/list-users' },
  'POST /user'                      :   { action: 'user/add-user' },
  'GET /user/:id'                   :   { action: 'user/get-user' },
  'PUT /user/:id'                   :   { action: 'user/update-user' },
  'DELETE /user/:id'                :   { action: 'user/delete-user' },
  
  'GET /team'                       :   { action: 'team/list-teams' },
  'POST /team'                      :   { action: 'team/add-team' },
  'GET /team/:id'                   :   { action: 'team/get-team' },
  'PUT /team/:id'                   :   { action: 'team/update-team' },
  'DELETE /team/:id'                :   { action: 'team/delete-team' },
  
  'GET /post'                       :   { action: 'post/list-posts' },
  'POST /post'                      :   { action: 'post/add-post' },
  'GET /post/:id'                   :   { action: 'post/get-post' },
  'PUT /post/:id'                   :   { action: 'post/update-post' },
  'DELETE /post/:id'                :   { action: 'post/delete-post' },

  'POST /manhour'                   :   { action: 'manhour/add-manhour'},
  'GET /manhour'                    :   { action: 'manhour/list-manhours'},
  
  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  
  
  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝
  
  
};
