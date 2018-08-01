/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
	  username: {
	    type: 'string',
	    required: true,
	    unique: true
	  },

	  password: {
	    type: 'string',
	    required: true,
	    protect: true
	  },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    fullname: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    
    section: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },

    isSuperAdmin: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Whether this user is a "super admin" with extra permissions, etc.'
    },
    
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    subscribedTasks: {
      collection: 'task',
      via: 'subscribers'
    },

    assignedTasks: {
      collection: 'task',
      via: 'assignee'
    },
    
    assignedProjects: {
      collection: 'project',
      via: 'members'
    },

    assignedTeams: {
      collection: 'team',
      via: 'members'
    },

    manhours: {
      collection: 'manhour',
      via: 'relatedUser'
    }
    
	},
	
	customToJSON: function() {
	   return _.omit(this, ['password'])
  },
  

};

