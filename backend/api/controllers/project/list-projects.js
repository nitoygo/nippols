/**
 * List Projects Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  friendlyName: 'List Projects',
  
  description: 'Lists project available for a user.',
  
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
    },

    id_like: {
      description: 'Querystring for a specific id',
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
      description: `An unknown user is trying to create this project.`,
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
      if (inputs._order) {
        order = inputs._order;
      }
      sort = `${inputs._sort} ${order}`;
    }

    var projects = [];
    var total = 0;

    if (!inputs.id_like) {
      total = await Project.count();
      projects = await Project.find({ 
        skip: skip,
        limit: limit,
        sort: sort
      });
  
    } else {
      var ids  = inputs.id_like.split("|").map((idStr) => {
        return parseInt(idStr);
      });

      projects = await Project.find({
        id: ids
      });

      total = projects.length;
    }

    this.res.set('x-total-count', total);
    return exits.success(projects);
  }
  
};
