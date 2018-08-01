/**
 * Update User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 // TODO: create common definitions for backend and frontend
const ACTIONS = {
  TASK_SUBSCRIBE: 'TASK_SUBSCRIBE',
  TASK_UNSUBSCRIBE: 'TASK_UNSUBSCRIBE'
};

const STATUS = {
  OPEN: 'open',
  ONGOING: 'ongoing',
  CLOSED: 'closed'
};

module.exports = {
  
  friendlyName: 'Update Task',

  description: 'Updates the Task specified by the request',
  
  inputs: {
    name: {
      required: false,
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

    status: {
      required: false,
      type: 'string',
      description: 'New status'
    },

    action: {
      required: false,
      type: 'string',
      description: 'Action of the user to be performed on this task'
    }
  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    }

  },

  fn: async function(inputs, exits) {
    var id = this.req.param('id');

    if (inputs.assignee) {
      // add task id to users assigned tasks
      await User.addToCollection(inputs.assignee, 'assignedTasks').members(id);
    }

    if (inputs.action) {
      // TODO: acquire this info from session. for now, get from temporary header 'x-user'
      var username = this.req.get('x-user');
      var user = await User.findOne({
        where: {
          username: username
        }
      });

      if (user) {
        if (inputs.action === ACTIONS.TASK_SUBSCRIBE) {
          // TODO: think of a better way to do this. custom model methods?

          // add user to list of subscribed users on this task
          await Task.addToCollection(id, 'subscribers').members(user.id);

          // add task to user list of subscribed tasks
          await User.addToCollection(user.id, 'subscribedTasks').members(id);
        }
        
        else if (inputs.action === ACTIONS.TASK_UNSUBSCRIBE) {
          // remove user from list of subscribed users on this task
          await Task.removeFromCollection(id, 'subscribers').members(user.id);

          // add task to user list of subscribed tasks
          await User.removeFromCollection(user.id, 'subscribedTasks').members(id);
        }
      }
    }

    var targetTask = await Task.findOne({
      where: {
        id: id
      }
    });

    if (targetTask) {
      if (inputs.name && inputs.name !== targetTask.name) {
        await Task.update({id: id}).set({name: inputs.name});
      }
      if (inputs.description && inputs.description !== targetTask.description) {
        await Task.update({id: id}).set({description: inputs.description});
      }
      if (inputs.projectScope && inputs.projectScope !== targetTask.projectScope) {
        await Task.update({id: id}).set({projectScope: inputs.projectScope});
      }
      if (inputs.parentTask && inputs.parentTask !== targetTask.parentTask) {
        await Task.update({id: id}).set({parentTask: inputs.parentTask});
      }
      if (inputs.externalLink && inputs.externalLink !== targetTask.externalLink) {
        await Task.update({id: id}).set({parentTask: inputs.parentTask});
      }
      if (inputs.assignee && inputs.assignee !== targetTask.assignee) {
        await Task.update({id: id}).set({assignee: inputs.assignee});
      }
      if (inputs.estimatedHours && inputs.estimatedHours !== targetTask.estimatedHours) {
        await Task.update({id: id}).set({estimatedHours: inputs.estimatedHours});
      }
      if (inputs.status && inputs.status !== targetTask.status) {
        if (inputs.status === STATUS.CLOSED) {
          let dateClosed = new Date();
          dateClosed.setHours(0,0,0,0);

          await Task.update({id: id}).set({dateClosed: inputs.dateClosed});
        }

        await Task.update({id: id}).set({status: inputs.status});
      }
    }

    var updatedTask = await Task.findOne({
      where: {
        id: id
      }
    }).populate('subscribers');

    if (updatedTask) {
      return exits.success(updatedTask);
    }

    return exits.success({});
  }
  
};
