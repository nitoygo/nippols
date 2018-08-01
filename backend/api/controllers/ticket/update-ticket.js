/**
 * Update Ticket Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Update Ticket',

  description: 'Updates the Ticket specified by the request',
  
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
    var link = this.req.param('link');
    var body = this.req.param('body');
    var type = this.req.param('type');

    var ticket = await Ticket.update({id: id})
    .set({
      link: link,
      body: body,
      type: type
    }).fetch();

    return exits.success(ticket[0]);
  }
  
};
