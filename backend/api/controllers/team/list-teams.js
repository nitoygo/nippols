/**
 * List Teams Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  friendlyName: 'List Teams',
  
  description: 'Lists team available for a user.',
  
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

    projects: {
      description: 'List teams under a given project id',
      type: 'number',
      required: false
    },
    
    members: {
      description: 'List teams under a given user id',
      type: 'number',
      required: false
    }

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `An unknown user is trying to create this team.`,
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

    /*
     * list request comes from associations
     */
    if (inputs.projects) {

      console.log(`looking for teams under project id ${inputs.projects}`);

      var project = await Project.findOne({id: inputs.projects})
      .populate('teams', {
        skip: skip,
        limit: limit,
        sort: sort
      });

      console.log(`found teams: ${project.teams}`);

      this.res.set('x-total-count', project.teams.length);
      return exits.success(project.teams);
    }

    if (inputs.members) {

      console.log(`looking for teams under user id ${inputs.members}`);

      var user = await User.findOne({id: inputs.members})
      .populate('assignedTeams', {
        skip: skip,
        limit: limit,
        sort: sort
      });

      console.log(`found teams: ${user.assignedTeams}`);

      this.res.set('x-total-count', user.assignedTeams.length);
      return exits.success(user.assignedTeams);
    }

    /*
     * list request does not come from associations
     */
    var total = await Team.count();
    var teams = await Team.find({ 
      skip: skip,
      limit: limit,
      sort: sort
    });

    if (teams) {
      this.res.set('x-total-count', total);
      return exits.success(teams);
    }

    return exits.emptySearch({});
  }
  
};
