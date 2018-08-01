/**
 * Add Post Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
  friendlyName: 'Add new Post',

  description: 'Adds new post.',
  
  inputs: {

    title: {
      description: 'Title of this new post',
      type: 'string',
      required: true
    },

    content: {
      description: 'Post content',
      type: 'string',
      required: true
    },

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    generalError: {
      statusCode: 500,
      description: `Something wrong went with the request.`,
    }

  },

  fn: async function(inputs, exits) {

    var username = this.req.get('X-User');

    var user = await User.findOne({ 
      where: {
        username: username
      }
    });

    if (user) {
      var newPost = await Post.create({
        title: inputs.title,
        content: inputs.content,
        author: user.id
      })
      .fetch();

      if (newPost) {
        return exits.success(newPost);
      }
    }

    return exits.generalError();
  }
  
};
