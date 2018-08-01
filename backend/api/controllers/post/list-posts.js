/**
 * List Posts Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  friendlyName: 'List Posts',
  
  description: 'Lists post available for a user.',
  
  inputs: {

    filter: {
      description: 'Parameters for this list request',
      type: 'string',
      required: false
    },

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
      description: `An unknown user is trying to create this post.`,
      responseType: 'notFound'
    }
  },
  
  
  fn: async function(inputs, exits) {
    var skip = 0;
    var limit = 10;
    var sort = 'id';
    var order = 'ASC';
    var filter = {};

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

    if (inputs.filter) {
      var tmpFilter;
      try {
        tmpFilter = JSON.parse(inputs.filter);
      } catch (e) {
        tmpFilter = inputs.filter;
      }

      filter = tmpFilter;
    }

    var total = await Post.count();

    var posts = await Post.find({ 
      where: filter,
      skip: skip,
      limit: limit,
      sort: sort
    });

    if (posts) {
      this.res.set('x-total-count', total);
      return exits.success(posts);
    }

    return exits.emptySearch();
  }
  
};
