/**
 * Add User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const STATUS = {
  OPEN: 'open',
  ONGOING: 'ongoing',
  CLOSED: 'closed'
};

module.exports = {
  friendlyName: 'Add new user',

  description: 'Adds a new user to this system',

  inputs: {

    name: {
      required: true,
      type: 'string',
      description: 'Task name'
    },

    description: {
      required: false,
      type: 'string',
      description: 'Task overview'
    },

    projectScope: {
      required: false,
      type: 'number',
      description: 'The project this task is under'
    },

    parentTask: {
      required: false,
      type: 'number',
      description: 'The parent task this is under, if any'
    },

    externalLink: {
      required: false,
      type: 'string',
      description: 'External URL related to this task (e.g. redmine/jira tickets)'
    },

    assignee: {
      required: false,
      type: 'number',
      description: 'The user id as the main point person for this task'
    },

    estimatedHours: {
      required: false,
      type: 'number',
      description: 'The project this task is under'
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

  },
  
  fn: async function (inputs, exits) {
    let initialStatus = STATUS.OPEN;
    let dateOpened = new Date();
    dateOpened.setHours(0,0,0,0);

    // temporarily set dateClosed 30 days after
    // this will be updated once the task is actually closed
    let dateClosed = new Date(dateOpened.getTime() + ((1000 * 60 * 60 * 24) * 30));

    let newTaskRecord = await Task.create(Object.assign({
      name: inputs.name,
      description: inputs.description,
      projectScope: inputs.projectScope,
      externalLink: inputs.externalLink,
      assignee: inputs.assignee,
      dateOpened: dateOpened,
      dateClosed: dateClosed,
      estimatedHours: inputs.estimatedHours,
      parentTask: inputs.parentTask,
      status: initialStatus
    })).fetch();

    if (newTaskRecord) {
      if (inputs.assignee) {
        await User.addToCollection(inputs.assignee, 'assignedTasks').members(newTaskRecord.id);
      }
      
      return exits.success(newTaskRecord);
    }

    return exits.generalError({});

  }
  
};
