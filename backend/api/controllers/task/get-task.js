/**
 * Get Task Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Get Task',

  description: 'Get the task specified by the id in the request',
  
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

    var task = await Task.find({ 
      where: {
        id: id
      }
    }).populate('subscribers');

    if (task[0]) {
      return exits.success(task[0]);
    }

    return exits.emptySearch({});
  }
  
};
