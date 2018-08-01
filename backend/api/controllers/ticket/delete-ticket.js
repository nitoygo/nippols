/**
 * Delete Ticket Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Delete Ticket',

  description: 'Deletes the Ticket specified by id',
  
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

    var Ticket = await Ticket.archive({id: id});

    return exits.success({id: id});
  }
  
};
