module.exports = {


  friendlyName: 'List manhour',


  description: 'List requested manhours depending in the inputs related task/user/date',


  inputs: {
    relatedTask: {
      type: 'number',
      required: true
    },

    relatedUser: {
      type: 'number',
      required: true
    },

    startDate: {
      type: 'number',
      required: false
    },

    endDate: {
      type: 'number',
      required: false
    },

  },


  exits: {

  },

  fn: async function (inputs, exits) {

    let manhours = await ManHour.find({
      where: {
        relatedTask: inputs.relatedTask,
        relatedUser: inputs.relatedUser,
        intendedDate: {
          '>=' : inputs.startDate,
          '<=' : inputs.endDate,
        }
      },
      sort: 'intendedDate ASC'
    });

    this.res.set('x-total-count', manhours.length);
    return exits.success(manhours);

  }


};
