
/**
 * List Tasks Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const STATUS = {
  OPEN: 'open',
  ONGOING: 'ongoing',
  CLOSED: 'closed'
};


function concatinateCollections(existingCollection, tempCollection) {
  for (let tempIdx = 0; tempIdx < tempCollection.length; tempIdx++) {
    existingCollection.push(tempCollection[tempIdx]);
  }
}

function mergeCollections(existingCollection, tempCollection) {
  let arrayToMerge = [];

  for (let tempIdx = 0; tempIdx < tempCollection.length; tempIdx++) {

    for (let existingIdx = 0; existingIdx < existingCollection.length; existingIdx++) {

      let existingEntry = existingCollection[existingIdx];
      let tempEntry = tempCollection[tempIdx];

      if (existingEntry[key] === tempEntry[key]) {
        found = true;
        break;
      }

    }

    // if not in intersection, store temporarily, we'll merge this to existingArray
    if (!found) {
      arrayToMerge.push(tempCollection[tempIdx]);
    }

  }

  concatinateCollections(existingCollection, arrayToMerge);
}

function intersectObjectCollection(existingCollection, tempCollection, key) {
  for (let existingIdx = existingCollection.length - 1; existingIdx > 0; existingIdx--) {
    let found = false;

    for (let tempIdx = 0; tempIdx < tempCollection.length; tempIdx++) {

      let existingEntry = existingCollection[existingIdx];
      let tempEntry = tempCollection[tempIdx];

      if (existingEntry[key] === tempEntry[key]) {
        found = true;
        break;
      }
    }

    // if not in intersection, remove in existing array
    if (!found) {
      existingCollection.splice(existingIdx, 1);
    }
  }
}

module.exports = {

  friendlyName: 'List Tasks',
  
  description: 'Lists tasks visible to this task.',
  
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

    assignee: {
      description: 'Part or complete username to query',
      type: 'string',
      required: false
    },

    projectScope: {
      description: 'List tasks under a given project id',
      type: 'number',
      required: false
    },

    parentTask: {
      description: 'List tasks under a given task id',
      type: 'number',
      required: false
    },

    teamTask: {
      description: 'List tasks under a given team id',
      type: 'number',
      required: false
    },

    openedBefore: {
      description: 'List tasks that were started after this date',
      type: 'number',
      required: false
    },

    notClosedUntil: {
      description: 'List tasks that were not closed until this date',
      type: 'number',
      required: false
    },

    status: {
      description: 'List tasks given a specific status',
      type: 'number',
      required: false
    },

    id_like: {
      description: 'List tasks based on the given id(s)',
      type: 'string',
      required: false
    },

    status_like: {
      description: 'List tasks based on the given status',
      type: 'string',
      required: false
    },

    subscriber_like: {
      description: 'List tasks based on the given watcher(s)',
      type: 'string',
      required: false
    },

    assignee_like: {
      description: 'List tasks based on the given assignee(s)',
      type: 'string',
      required: false
    },


  },

  exits: {

    success: {
      statusCode: 200,
      description: 'The request completed sucessfully.',
    },

    emptySearch: {
      description: `An unknown task is trying to create this project.`,
      responseType: 'notFound'
    }
  },
  
  fn: async function(inputs, exits) {
    let tasks = [];
    let queriedAtLeastOnce = false;

    // filter tasks based on project scope
    if (inputs.projectScope) {
      // initial array
      let project = await Project.findOne({id: inputs.projectScope}).populate('tasks');
      concatinateCollections(tasks, project.tasks);

      queriedAtLeastOnce = true;
    }

    // filter tasks based on parent task
    if (inputs.parentTask) {
      let tempTasks = [];
      tempTasks = await Task.find({
        parentTask : inputs.parentTask
      });

      if (tasks.length === 0) {
        // initial array
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array
        intersectObjectCollection(tasks, tempTasks, 'id')
      }

      queriedAtLeastOnce = true;
    }

    // filter tasks based on team
    if (inputs.teamTask) {
      let team = await Team.findOne({id: inputs.teamTask}).populate('members');
      let tempTasks = [];

      for (let userIdx = 0; userIdx < team.members.length; userIdx++) {
        let userInDb = await User.findOne({id: team.members[userIdx].id}).populate('assignedTasks');
        for (let taskIdx = 0; taskIdx < userInDb.assignedTasks.length; taskIdx++) {
          tempTasks.push(userInDb.assignedTasks[taskIdx]);
        }
      }

      if (tasks.length === 0) {
        // initial array
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }

      queriedAtLeastOnce = true;
    }
    
    // filter tasks based on assignee
    if (inputs.assignee) {
      let users = await User.find({username : {'contains' : inputs.assignee }}).populate('assignedTasks');

      let tempTasks = [];
      users.forEach((user) => {
        user.assignedTasks.forEach((task) => {
          tempTasks.push(task);
        })
      });

      if (tasks.length === 0) {
        // initial array
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }

      queriedAtLeastOnce = true;
    }

    if (inputs.openedBefore && inputs.notClosedUntil) {
      let tempTasks = [];
      tempTasks = await Task.find({
        where : {
          dateOpened: { '<=' : inputs.openedBefore },
          dateClosed: { '>=' : inputs.notClosedUntil }
        }
      });

      if (tasks.length === 0) {
        // initial array
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }
    }

    if (inputs.id_like) {
      let ids  = inputs.id_like.split("|").map((idStr) => {
        return parseInt(idStr);
      });

      let tempTasks = [];
      tempTasks = await Task.find({
        id: ids
      });
      
      if (tasks.length === 0) {
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }

      queriedAtLeastOnce = true;
    } 
    
    if (inputs.status_like) {
      let statusOpts = inputs.status_like.split("|");

      let tempTasks = [];
      tempTasks = await Task.find({
        status: {
          in: statusOpts
        }
      });

      if (tasks.length === 0) {
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }

      queriedAtLeastOnce = true;
    }

    if (inputs.subscriber_like) {
      let subscribers = inputs.subscriber_like.split("|");
      let tempTasks = [];

      for (let userIdx = 0; userIdx < subscribers.length; userIdx++) {
        let subscriber = await User.findOne({username: subscribers[userIdx]}).populate('subscribedTasks');
        for (let taskIdx = 0; taskIdx < subscriber.subscribedTasks.length; taskIdx++) {
          tempTasks.push(subscriber.subscribedTasks[taskIdx]);
        }

        let assignee = await User.findOne({username: subscribers[userIdx]}).populate('assignedTasks');
        for (let taskIdx = 0; taskIdx < assignee.assignedTasks.length; taskIdx++) {
          tempTasks.push(assignee.assignedTasks[taskIdx]);
        }
      }

      if (tasks.length === 0) {
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }

      queriedAtLeastOnce = true;
    }

    if (inputs.assignee_like) {
      let assignees = inputs.assignee_like.split("|");
      let tempTasks = [];

      for (let userIdx = 0; userIdx < assignees.length; userIdx++) {
        let userInDb = await User.findOne({username: assignees[userIdx]}).populate('assignedTasks');
        for (let taskIdx = 0; taskIdx < userInDb.assignedTasks.length; taskIdx++) {
          tempTasks.push(userInDb.assignedTasks[taskIdx]);
        }
      }

      if (tasks.length === 0) {
        concatinateCollections(tasks, tempTasks);
      } else {
        // existing array - filter by finding intersection
        intersectObjectCollection(tasks, tempTasks, 'id');
      }

      queriedAtLeastOnce = true;
    }

    let skip = 0;
    let limit = 100;
    let sort = 'id';
    let order = 'ASC';

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

    if (!queriedAtLeastOnce) {
      total = await Task.count();

      // no existing array, and no other filters
      tasks = await Task.find({
        skip: skip,
        limit: limit,
        sort: sort
      });

    } else {
      // existing array with all of the above filters applied
      tasks.splice(0, skip);
      tasks.splice(limit, tasks.length - limit);

      total = tasks.length;
    }

    this.res.set('x-total-count', total);
    return exits.success(tasks);
  }

};
