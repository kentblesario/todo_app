const model = require("../model");
const Todo = model.todo;
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.addTask = async (req, res, next) => {
    try {
        req.body.dateAdded = new Date().getTime(),
        Todo.create(req.body, (err, response) => {
            if (err) {
                return res.status(500).send({ success: false, message: err.message });
            } else {
                return res.status(201).send({ success: true, data: response, message: "Successfully added a task." });
            }
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

exports.getTodo = async (req, res, next) => {

  try {
    let totalCount = 1;
    await Todo.countDocuments({}).then(async result => {
        totalCount = await result;
      });
    await Todo.find({}).limit(parseInt(req.query.itemsPerPage)).skip((parseInt(req.query.page) - 1) * parseInt(req.query.itemsPerPage))
        .then(function (response, err) {
            if (response) {
                return res.status(200).send({ success: true, data: response, totalCount: totalCount });
            } else {
                return res.status(500).send({ success: false, message: err.message });
            }
        })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.delTodo = async (req, res, next) => {
  try {
    await Todo.deleteOne({ _id: ObjectId(req.params.id), })
    .then(function (response, err) {
        if (response) {
            if(response.deletedCount > 0){
                return res.status(200).send({ success: true, message: 'Successfully deleted the task.' });
            }else{
                return res.status(404).send({ success: false, message: 'Task not found' });
            }
        } else {
            return res.status(500).send({ success: false, message: err.message });
        }
    })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });

  }

};

exports.completeTodo = async (req, res, next) => {
 try {
      
    await Todo.updateOne( {
        _id: ObjectId(req.params.id),
    },
    {
        $set:{status: 1}
    } )
    .then(function (response, err) {
        if (response) {
            return res.status(200).send({ success: true, message: 'Successfully completed the task.' });
        } else {
            return res.status(500).send({ success: false, message: err });
        }
    })
 } catch (error) {
    return res.status(500).send({ success: false, message: error.message });

 }
};

exports.updateToDo = async (req, res, next) => {
 try {
    await Todo.updateOne( {
        _id: ObjectId(req.params.id),
    },
    {
        $set:{
            title: req.body.task.title,
            status: 0,
        },
    } )
    .then(function (response, err) {
        if (response) {
            return res.status(200).send({ success: true, message: 'Successfully updated the task.' });
        } else {
            return res.status(500).send({ success: false, message: err });
        }
    })
 } catch (error) {
    return res.status(500).send({ success: false, message: error.message });

 }
};