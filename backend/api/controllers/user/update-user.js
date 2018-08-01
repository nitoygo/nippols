/**
 * Update User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Update User',

  description: 'Updates the User specified by the request',
  
  inputs: {
    
  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    }

  },

  fn: async function(inputs, exits) {
    var id = this.req.param('id');
    var password = this.req.param('password');
    var email = this.req.param('email');

    var user = await User.update({id: id})
    .set({
      password: await sails.helpers.passwords.hashPassword(password),
      email: email
    }).fetch();

    return exits.success(user[0]);
  }
  
};
