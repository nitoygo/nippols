/**
 * List Users Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  friendlyName: 'List Users',
  
  description: 'Lists users visible to this user.',
  
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

    q: {
      description: 'Querystring to match user name',
      type: 'string',
      required: false
    },

    assignedProjects: {
      description: 'List users under a given project id',
      type: 'number',
      required: false
    },

    assignedTeams: {
      description: 'List users under a given team id',
      type: 'number',
      required: false
    },

    id_like: {
      description: 'Querystring for a specific id',
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
      description: `No users found.`,
      responseType: 'notFound'
    }
  },
  
  
  fn: async function(inputs, exits) {
    var skip = 0;
    var limit = 10;
    var sort = 'id';
    var order = 'ASC';

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
    
    /*
     * list request comes from associations
     */
    
    if (inputs.assignedProjects) {
      var project = await Project.findOne({id: inputs.assignedProjects})
      .populate('members', {
        skip: skip,
        limit: limit,
        sort: sort
      });

      this.res.set('x-total-count', project.members.length);
      return exits.success(project.members);
    }

    if (inputs.assignedTeams) {
      var team = await Team.findOne({id: inputs.assignedTeams})
      .populate('members', {
        skip: skip,
        limit: limit,
        sort: sort
      });

      this.res.set('x-total-count', team.members.length);      
      return exits.success(team.members);
    }

    /*
     * list request does not come from associations
     */
    var users = [];
    var total = 0;

    if (inputs.q) {
      users = await User.find({
        skip: skip,
        limit: limit,
        sort: sort,
        where: {
          or : [
            {
              username: { contains: inputs.q },
            },
            {
              email: { contains: inputs.q },
            }
          ]
        }
          
      });

      total = users.length;

    } else {
      if (!inputs.id_like) {
        users = await User.find({
          skip: skip,
          limit: limit,
          sort: sort
        });
  
        total = await User.count();  

      } else {
        var ids  = inputs.id_like.split("|").map((idStr) => {
          return parseInt(idStr);
        });

        users = await User.find({
          where: {
            id: ids
          }
        });

        total = users.length;
      }
    }

    this.res.set('x-total-count', total);
    return exits.success(users);

  }
  
};
