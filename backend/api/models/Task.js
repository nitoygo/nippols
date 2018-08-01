/**
 * Task.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true,
    },
    
    description: {
      type: 'string',
      required: false,
    },

    externalLink: {
      type: 'string',
      required: false
    },

    estimatedHours: {
      type: 'number',
      required: false
    },

    status: {
      type: 'string',
      required: false
    },

    dateOpened: {
      type: 'number',
      required: false
    },

    dateClosed: {
      type: 'number',
      required: false
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    parentTask: {
      model: 'task'
    },

    subtasks: {
      collection: 'task',
      via: 'parentTask'
    },

    assignee: {
      model: 'user'
    },

    subscribers: {
      collection: 'user',
      via: 'subscribedTasks'
    },

    projectScope: {
      model: 'project'
    },

    manhours: {
      collection: 'manhour',
      via: 'relatedTask'
    },

    relatedTicket: {
      model: 'ticket'
    },

    notes: {
      model: 'note'
    },

  },

};

