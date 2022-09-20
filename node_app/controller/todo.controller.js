const model = require("../model");
const Todo = model.todo;
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.addTask = async (req, res, next) => {
    console.log(req.body)
    Todo.create(req.body, (err, response) => {
        if (err) {
            return res.status(500).send({ success: false, message: err.message });
        } else {
            return res.status(200).send({ success: true, data: response, message: "Successfully added a task." });
        }
    });
};

exports.getTodo = async (req, res, next) => {

    let totalCount = 1;
    await Todo.find({})
        .then(function (response, err) {
            console.log(response);
            if (response) {
                return res.status(200).send({ success: true, data: response, totalCount: totalCount });
            } else {
                return res.status(500).send({ success: false, message: err });
            }
        })
};

exports.delTodo = async (req, res, next) => {
    console.log(req.query._id)
    await Todo.deleteOne({  _id: ObjectId(req.query._id),})
        .then(function (response, err) {
            console.log(response);
            if (response) {
                return res.status(200).send({ success: true, message: 'Successfully deleted the task.' });
            } else {
                return res.status(500).send({ success: false, message: err });
            }
        })

};