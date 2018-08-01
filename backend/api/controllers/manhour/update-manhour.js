module.exports = {


  friendlyName: 'Update manhour',


  description: '',


  inputs: {

    numberOfMinutes: {
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

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var mhId = this.req.param('id');
    await ManHour.update({id: mhId})
    .set({
      numberOfMinutes: inputs.numberOfMinutes
    });

    return exits.success();
  }


};
