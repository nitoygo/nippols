/**
 * Get User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Get User',

  description: 'Get the user specified by the id in the request',
  
  inputs: {

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `No user matches the id given.`,
      responseType: 'notFound'
    }
  },

  fn: async function(inputs, exits) {
    var id = this.req.param('id');

    var user = await User.findOne({ 
      where: {
        id: id
      }
    });

    if (user) {
      return exits.success(user);
    }

    return exits.emptySearch();
  }
  
};
