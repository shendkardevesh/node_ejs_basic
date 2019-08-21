const logger = require('tracer').colorConsole();
const User = require('../models/user.model');

const saveUser = async (body) => {
  try {
    let user = {
      username: body.username,
      dob: body.dob,
      email: body.email,
      mobile: body.mobile,
      city: body.city,
      state: body.state,
      address: body.address
    };
    let userObj = new User(user);
    let savedUser = await userObj.save();
    logger.info('user object saved successfully: ', savedUser);
    return savedUser;
  } catch(err) {
    throw(err);
  }
};

const userLists = async () => {
  try {
    let list = await User.find();
    logger.info('user lists: ', list);
    return list;
  } catch(err) {
    throw(err);
  }
};

const userFindById = async (id) => {
  try {
    let user = await User.findById(id);
    logger.info('user findById: ', user);
    return user;
  } catch(err) {
    throw(err);
  }
};

const updateById = async (id, body) => {
  try {
    let user = await User.findByIdAndUpdate(id, body, {new: true});
    return user;
  } catch(err) {
    throw(err);
  }
};

const deleteUserById = async(id) => {
  try {
    let user = await User.findByIdAndRemove(id);
    logger.info('user delete successfully:', user._id);
    return {
      status: true,
      message: `user delete successfully`
    };
  } catch(err) {
    throw(err);
  }
}

module.exports = {
  saveUser,
  userLists,
  userFindById,
  updateById,
  deleteUserById
};
