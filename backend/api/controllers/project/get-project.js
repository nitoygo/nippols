/**
 * Delete Project Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Get Project',

  description: 'Get project specified by the id in the request',
  
  inputs: {

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `No project matches the given id.`,
      responseType: 'notFound'
    }
  },

  fn: async function(inputs, exits) {
    var id = this.req.param('id');

    var project = await Project.findOne({ 
      where: {
        id: id
      }
    });

    if (project) {
      return exits.success(project);
    }

    return exits.emptySearch({});
  }
  
};
