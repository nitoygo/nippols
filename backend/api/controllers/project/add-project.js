/**
 * Add Project Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
  friendlyName: 'Add new Project',

  description: 'Adds new project.',
  
  inputs: {

    name: {
      description: 'Project name to be used for this to-be-added project',
      type: 'string',
      required: true
    },
    description: {
      description: 'Project description',
      type: 'string',
      required: false
    },
    code: {
      description: 'Project code to be used for this to-be-added project',
      type: 'string',
      required: true
    }

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
      description: `An unknown user is trying to create this project.`,
      responseType: 'notFound'
    },

    alreadyExists: {
      statusCode: 409,
      description: 'Project already exists.',
    }
  },

  fn: async function(inputs, exits) {
    var newProject = await Project.create({
      code: inputs.code,
      name: inputs.name,
      description: inputs.description
    })
    .intercept('E_UNIQUE', 'alreadyExists')
    .fetch();

    if (newProject) {
      return exits.success(newProject);
    }

    return exits.generalError();
  }
  
};
