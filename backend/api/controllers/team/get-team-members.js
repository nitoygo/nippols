/**
 * Get Teams of User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  friendlyName: 'Get Team Members',
  
  description: 'Lists the users in this team',
  
  inputs: {

    filter: {
      description: 'Parameters for this list request',
      type: 'string',
      required: false
    },

    range: {
      description: 'Start and end entries',
      type: 'string',
      required: false
    },

    sort: {
      description: 'Sorting parameters in column,order combination',
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
      statusCode: 200,
      description: `An unknown user is trying to create this team.`,
      responseType: 'notFound'
    }
  },
  
  
  fn: async function(inputs, exits) {

    var range = JSON.parse(inputs.range);
    var sort  = JSON.parse(inputs.sort)
    var filter = JSON.parse(inputs.filter);

    var team = await Team.findOne({ 
      where: {
        id: filter.id
      }
    }).populate('members');

    if (team) {
      var members = team.members;
      var total = Object.keys(members).length;

      this.res.set('x-total-count', total);

      return exits.success(members);
    }

    return exits.emptySearch({});
  }
  
};
