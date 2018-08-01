/**
 * Get Team Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Get Team',

  description: 'Get team specified by the id in the request',
  
  inputs: {

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `No team matches the given id.`,
      responseType: 'notFound'
    }
  },

  fn: async function(inputs, exits) {
    var id = this.req.param('id');

    var team = await Team.findOne({ 
      where: {
        id: id
      }
    });

    if (team) {
      return exits.success(team);
    }

    return exits.emptySearch({});
  }
  
};
