var express = require('express');
var router = express.Router();
const logger = require('tracer').colorConsole();
const userController = require('../controllers/user.controller');
const moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', (req, res) => {
  res.render('users/create-users.html', {
    title: 'Create User',
    data: {}
  });
});

router.post('/create', async (req, res) => {
  try {
    logger.info('request body:', req.body);
    let response = await userController.saveUser(req.body);
    logger.info('user saved successfully ......!');
    res.redirect('/users/lists');
  } catch(err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.get('/lists', async (req, res) => {
  try {
    logger.info('render user list page.');
    let userList = await userController.userLists();
    
    let userArray = [];
    // logger.info(userList)
    for (let i = 0; i < userList.length; i++) {
      let users = {};
      users._id = userList[i]._id;
      users.username = userList[i].username;
      users.mobile = userList[i].mobile;
      users.email = userList[i].email;
      users.city = userList[i].city;
      users.dob = moment(new Date(userList[i].dob).toUTCString()).utc().format('YYYY-MM-DD');
      userArray.push(users);
    }
    // logger.info(userArray);
    res.render('users/list-users.html', {
      title: 'list User',
      users: userArray
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.get('/update/:id', async (req, res) => {
  try {
    logger.info('render update:');
    let user = await userController.userFindById(req.params.id);
    // user.dob = moment(new Date(user.dob).toUTCString()).utc().format('YYYY-MM-DD');
    user.date = moment(new Date(user.dob).toUTCString()).utc().format('YYYY-MM-DD');
    logger.info('formated date:', user.dob);
    logger.info('user:', user);
    res.render('users/create-users.html', {
      title: 'Create User',
      data: user
    });
  } catch(err) {
    throw(err);
  };
});

router.post('/update/:id', async (req, res) => {
  try {
    let user =  await userController.updateById(req.params.id, req.body);
    res.redirect('/users/lists');    
  } catch(err) {
    throw(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    logger.info('post called.')
    let response = await userController.deleteUserById(req.params.id);
    res.send(response);
  } catch(err) {
    throw(err);
  }
});

module.exports = router;
