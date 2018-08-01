/**
 * Get Ticket Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Get Ticket',

  description: 'Get the ticket specified by the id in the request',
  
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

    var ticket = await Ticket.find({ 
      where: {
        id: id
      }
    });

    if (ticket[0]) {
      return exits.success(ticket[0]);
    }

    return exits.emptySearch({});
  }
  
};
