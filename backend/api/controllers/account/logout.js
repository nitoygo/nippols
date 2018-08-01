/**
 * Logout Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  friendlyName: 'Logout',


  description: 'Log out of this app.',
    
  inputs: {

  },

  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged out.'
    },

  },
  
  fn: async function (inputs, exits) {
    delete this.req.session.userId;
    return exits.success();
  }
};

