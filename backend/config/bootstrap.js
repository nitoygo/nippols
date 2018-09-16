/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up data during development.

  if (await User.count() > 0) {
    return done();
  }

  await User.create(Object.assign({
    username: "admin",
    password: await sails.helpers.passwords.hashPassword("admin"),
    email: "admin@nippols.com",
    isSuperAdmin: true
  }));

  return done();

};
