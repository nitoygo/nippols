/**
 * Update Project Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
  friendlyName: 'Update Project',

  description: 'Updates the project specified by the request',
  
  inputs: {
    id: {
      description: 'ID of project as stored in database',
      type: 'number',
      required: true
    },

    name: {
      description: 'Project name to be used for this to-be-updated project',
      type: 'string',
      required: true
    },

    code: {
      description: 'Project code to be used for this to-be-updated project',
      type: 'string',
      required: true
    },

    description: {
      description: 'Project description',
      type: 'string',
      required: false
    },

    members: {
      description: 'Array of objects containing member ids',
      type: 'json',
      required: false
    }
  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    }

  },

  fn: async function(inputs, exits) {
    var pid = inputs.id;
    var name = inputs.name;
    var code = inputs.code;
    var description = inputs.description;
    var members = inputs.members;

    console.log("in update-project controller...");
    console.log(pid);
    console.log(name);
    console.log(description);
    console.log(members);

    if (!members) {
      console.log("no members to add");
    } else {
      var membersIds = members.map((member)=>{
        return member.user;
      });

      await Project.addToCollection(pid, 'members').members(membersIds);
    }

    if (!description) {
      console.log("no description to change");
      description = "";
    }

    var project = await Project.update({id: pid})
    .set({
      name: name,
      code: code,
      description: description
    }).fetch();

    return exits.success(project[0]);
  }
  
};
