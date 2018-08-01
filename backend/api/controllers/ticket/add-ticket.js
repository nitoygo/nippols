/**
 * Add Ticket Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  friendlyName: 'Add new ticket',

  description: 'Adds a new ticket',

  inputs: {

    link: {
      required: true,
      type: 'string',
      description: 'URL of ticket origin'
    },

    body: {
      required: true,
      type: 'string',
      description: 'Ticket contents'
    },

    type: {
      required: true,
      type: 'string',
      description: 'Type to distinguish how to handle body (if from redmine, jira, etc)'
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

    var newTicketRecord = await Ticket.create(Object.assign({
      link: inputs.link,
      body: inputs.body,
      type: inputs.type,
    })).fetch();

    if (newTicketRecord) {      
      return exits.success(newTaskRecord);
    }

    return exits.generalError({});

  }
  
};
