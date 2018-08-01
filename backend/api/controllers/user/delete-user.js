/**
 * Delete User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Delete User',

  description: 'Deletes the User specified by the request',
  
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

    var user = await User.archive({id: id});

    return exits.success({id: id});
  }
  
};
