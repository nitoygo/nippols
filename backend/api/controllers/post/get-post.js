/**
 * Delete Post Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Get Post',

  description: 'Get post specified by the id in the request',
  
  inputs: {

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `No post matches the given id.`,
      responseType: 'notFound'
    }
  },

  fn: async function(inputs, exits) {
    var id = this.req.param('id');

    var post = await Post.findOne({ 
      where: {
        id: id
      }
    });

    if (post) {
      return exits.success(post);
    }

    return exits.emptySearch();
  }
  
};
