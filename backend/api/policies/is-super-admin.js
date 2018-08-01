/**
 * is-super-admin
 *
 * A simple policy that allows any request from an authenticated user.
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
      if (user.isSuperAdmin) {
        console.log("user [" + user.username + "] is super admin");
        return proceed();
      }

      return forbidden();
    }
    
  }

  console.log("unregistered user: " + username);

  return res.unauthorized();
};
