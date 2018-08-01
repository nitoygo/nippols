/**
 * Project.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    code: {
        type: 'string',
        maxLength: 32,
        required: true,
        unique: true
    },

    name: {
      type: 'string',
      maxLength: 32,
      required: true,
      description: 'This project\'s Friendly name.'
    },

    description: {
      type: 'string',
      required: false,
      defaultsTo: '',
      description: 'Project description.'
    },

    createdBy: {
      model: 'user',
      required: false
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    tasks: {
      collection: 'task',
      via: 'projectScope'
    },

    members: {
      collection: 'user',
      via: 'assignedProjects'
    },

    teams: {
      collection: 'team',
      via: 'projects'
    }

  },

};

