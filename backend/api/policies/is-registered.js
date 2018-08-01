/**
 * is-registered
 *
 * A simple policy that allows any request from a registered user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  let username = req.get('x-user');

  if (username) {

    let user = await User.findOne({ 
      where: {
        username: username
      }
    });

    if(user) {
      console.log("user [" + user.username + "] is registered");
      return proceed();
    }
    
  }

  console.log("unregistered user: " + username);

  return res.forbidden();
};
