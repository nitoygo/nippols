/**
 * Delete Team Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Delete Team',

  description: 'Deletes the team specified by the request',
  
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

    var team = await Team.archive({id: id});

    return exits.success({id: id});
  }
  
};
