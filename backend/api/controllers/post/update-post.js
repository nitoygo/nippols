/**
 * Update Post Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Update Post',

  description: 'Updates the post specified by the request',
  
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
    var title = this.req.param('title');
    var content = this.req.param('content');

    var post = await Post.update({id: id})
    .set({
      title: title,
      content: content
    }).fetch();

    return exits.success(post[0]);
  }
  
};
