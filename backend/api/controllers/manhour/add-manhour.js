
const ACTIONS = {
  REPLACE: 'REPLACE',
  ADD: 'ADD'
};

module.exports = {
  friendlyName: 'Add manhour',

  description: '',

  inputs: {

    numberOfMinutes: {
      type: 'number',
      required: true
    },

    intendedDate: {
      type: 'number',
      required: true
    },

    relatedTask: {
      type: 'number',
      required: true
    },

    relatedUser: {
      type: 'number',
      required: true
    },

    action: {
      type: 'string',
      required: true
    }
  },

  exits: {

  },

  fn: async function (inputs, exits) {
    
    let tempResult = await ManHour.find({
      where: {
        relatedUser: inputs.relatedUser,
        relatedTask: inputs.relatedTask,
        intendedDate: inputs.intendedDate
      }
    });

    let manhour;

    if (tempResult.length === 0) {
      manhour = await ManHour.create({
        numberOfMinutes: inputs.numberOfMinutes,
        intendedDate: inputs.intendedDate,
        relatedUser: inputs.relatedUser,
        relatedTask: inputs.relatedTask
      }).fetch();
    }
    else {
      manhour = tempResult[0];
      if (inputs.action === ACTIONS.ADD) {
        manhour.numberOfMinutes += inputs.numberOfMinutes;
      } else if (inputs.action == ACTIONS.REPLACE) {
        manhour.numberOfMinutes = inputs.numberOfMinutes;
      }
      
      await ManHour.update({id: manhour.id})
      .set({
        numberOfMinutes: manhour.numberOfMinutes
      });
    }

    return exits.success({});
  }

};
