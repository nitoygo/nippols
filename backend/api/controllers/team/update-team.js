/**
 * Update Team Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
  friendlyName: 'Update Team',

  description: 'Updates the team specified by the request',
  
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
    var name = this.req.param('name');
    var membersIds = this.req.param('members');
    var projectIds = this.req.param('projects');
    
    if (membersIds != undefined) {
      await Team.addToCollection(id, 'members').members(membersIds);
    }

    if (projectIds != undefined) {
      await Team.addToCollection(id, 'projects').members(projectIds);
    }

    var team = await Team.update({id: id})
    .set({
      name: name
    }).fetch();
    
    return exits.success(team[0]);
  }
  
};
