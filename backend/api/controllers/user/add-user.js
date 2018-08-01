/**
 * Add User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  friendlyName: 'Add new user',

  description: 'Adds a new user to this system',

  inputs: {

    email: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. user@domain.com',
      extendedDescription: 'Must be a valid email address.',
    },

    username: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'dimay.hazel',
      description: 'The user\'s account name.',
    },
    
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'pass1234',
      description: 'The unencrypted password to use for the new account.'
    }
    
  },

  
  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullname, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
                           'parameters should have been validated/coerced _before_ they were sent.'
    },

    alreadyRegistered: {
      statusCode: 409,
      description: 'The provided user is already in use.',
    },

  },
  
  fn: async function (inputs, exits) {
    
    console.log (inputs);

    var newEmail = inputs.email.toLowerCase();

    var newUserRecord = await User.create(Object.assign({
      username: inputs.username,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      email: newEmail,
      isSuperAdmin: false
    }, sails.config.custom.verifyEmailAddresses? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed'
    }:{}))
    .intercept('E_UNIQUE', 'alreadyRegistered')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    // Send 200 OK Status.
    return exits.success(newUserRecord);

  }
  
};
