/**
 * Add Team Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
  friendlyName: 'Add new Team',
  
  description: 'Adds new team.',
  
  inputs: {

    name: {
      description: 'Team name to be used for this to-be-added team',
      type: 'string',
      required: true
    },

    members: {
      description: 'Team members to be added initially',
      type: ['number'],
      required: false
    },

    projects: {
      description: 'Projects of this team to be added initially',
      type: ['number'],
      required: false
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
    },

    unknownUser: {
      description: `An unknown user is trying to create this team.`,
      responseType: 'notFound'
    },

    alreadyExists: {
      statusCode: 409,
      description: 'Team already exists.',
    }
  },

  fn: async function(inputs, exits) {

    var projectIds = inputs.projects;
    var membersIds = inputs.members;

    var newTeam = await Team.create({
      name: inputs.name
    })
    .intercept('E_UNIQUE', 'alreadyExists')
    .fetch();

    if (newTeam) {
      try {
        await Team.addToCollection(newTeam.id, 'members').members(membersIds);
        await Team.addToCollection(newTeam.id, 'projects').members(projectIds);

      } catch(e) {
        console.log ("failed to set initial collections")
      }

      return exits.success(newTeam);
    }

    return exits.generalError({});
  }
  
};
