/**
 * List Tickets Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  friendlyName: 'List Tickets',
  
  description: 'Lists Tickets visible to this user.',
  
  inputs: {

    _start: {
      description: 'Start of entries',
      type: 'number',
      required: false
    },

    _end: {
      description: 'End of entries',
      type: 'number',
      required: false
    },

    _sort: {
      description: 'Field to sort',
      type: 'string',
      required: false
    },

    _order: {
      description: 'Order in which entries are returned',
      type: 'string',
      required: false
    }

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `No tickets could be listed.`,
      responseType: 'notFound'
    }
  },
  
  
  fn: async function(inputs, exits) {
    var skip = 0;
    var limit = 10;
    var sort = 'id';
    var order = 'ASC';

    if (inputs._start) {
      skip = inputs._start;
      limit = inputs._start + 10;
    }

    if (inputs._end) {
      limit = inputs._end;
    }

    if (inputs._sort) {
      sort = inputs._sort;
    }

    if (inputs._order) {
      order = inputs._order;
    }

    var total = await Ticket.count();
    var tickets = await Ticket.find({
      skip: skip,
      limit: limit,
      sort: sort
    });

    if (tickets) {
      this.res.set('x-total-count', total);
      return exits.success(tickets);
    }

    return exits.emptySearch([]);
  }
  
};
