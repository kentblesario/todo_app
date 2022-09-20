const request = require("supertest");
const app = require("../index");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const model = require("../model");
const Todo = model.todo;

describe("To Do", () => {
//   it("GET /todo/getTodoList --> array of tasks", () => {
//     return request(app)
//       .get("/todo/getTodoList")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((response) => {
//         expect(response.body).toEqual(
//           expect.arrayContaining([
//             expect.ObjectContaining({
//               title: expect.any(String),
//               dateAdded: expect.any(String),
//               status: expect.any(Number),
//             }),
//           ])
//         );
//       });
//   });

  it("POST /todo/addTask --> create a todo", () => {
    return request(app)
      .post("/todo")
      .send({
        title: "Buy Milk test",
      })
      .expect(201)
      .then((res) => {
        // console.log('res: ', res);
        // expect(res.body._id).toBeDefined();
        expect(res._body.success).toBe(true)
        expect(res._body.data).toHaveProperty('title')
        expect(res._body.data).toHaveProperty('dateAdded')
        expect(res._body.data).toHaveProperty('status')
      });
    
  });


  it("PUT /todo/complete --> complete a todo", () => {
    const data = Todo.find({'title':'Buy Milk test'});
    return request(app)
    .put("/todo/complete")
    .send({
      _id: ObjectId(data._id),
    })
    .expect(200)
    .then((res) => {
      // expect(res.body._id).toBeDefined();
      expect(res._body.success).toBe(true)
    //   expect(res._body.data).toHaveProperty('title')
    //   expect(res._body.data).toHaveProperty('dateAdded')
    //   expect(res._body.data).toHaveProperty('status')
    });

  });

  it("PUT /todo/updateToDo --> update a todo", () => {
    
  });

  it("DELETE /todo/delTodo --> delete a todo", () => {
    let _id
    beforeAll(async () => {
        const resp = await supertest(app)
            .post(`/todo`)
            .send({title:'A delete data'})
        console.log('resp11',resp);
        // newTodoId = todoResponse.body.data.id
    })

    const data = Todo.find({'title':'Buy Milk test'});
    return request(app)
    .delete(`/todo/${data._id}`)
    .expect(200)
    .then((res) => {
      // expect(res.body._id).toBeDefined();
      expect(res._body.success).toBe(true)
 
    });
  });
});
