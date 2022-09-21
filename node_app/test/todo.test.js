const request = require("supertest");
const app = require("../index");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const model = require("../model");
const Todo = model.todo;
const supertest = require("supertest");

describe("Add To Do", () => {

  let data;
  afterAll(async () => {
    await supertest(app)
      .delete(`/todo/${data.data._id}`)
  })

  it("POST /todo  = create a todo", () => {
    return request(app)
      .post("/todo")
      .send({
        title: "Buy Milk test",
      })
      .expect(201)
      .then(async (res) => {
        data = await res.body
        expect(res.body.success).toBe(true)
        expect(res.body.data).toHaveProperty('title')
        expect(res.body.data).toHaveProperty('dateAdded')
        expect(res.body.data).toHaveProperty('status')
      });

  });

});

describe("Update To Do Complete", () => {

  let data;
  beforeAll(async () => {
    const resp = await supertest(app)
      .post(`/todo`)
      .send({ title: 'Buy apples' })

    data = resp.body
  })

  afterAll(async () => {

    await supertest(app)
      .delete(`/todo/${data.data._id}`)
  })
  it("PUT /todo/:id = update a todo", () => {
    return request(app)
      .put(`/todo/complete/${data.data._id}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body.success).toBe(true)
        expect(res.body).toHaveProperty('message')
      });

  });

});

describe("Update To Do Title", () => {

  let data;
  beforeAll(async () => {
    const resp = await supertest(app)
      .post(`/todo`)
      .send({ title: 'Buy Eggs 1' })

    data = resp.body
  })

  afterAll(async () => {
    await supertest(app)
      .delete(`/todo/${data.data._id}`)
  })
  it("PUT /todo/ = update a todo", () => {
    return request(app)
      .put(`/todo/${data.data._id}`)
      .send({
        task: { title: 'Buy Apples 3' }
      })
      .expect(200)
      .then(async (res) => {
        expect(res.body.success).toBe(true)
        expect(res.body).toHaveProperty('message')
      });

  });
});


describe("Delete To Do", () => {
  let data;
  beforeAll(async () => {
    const resp = await supertest(app)
      .post(`/todo`)
      .send({ title: 'Buy apples' })

    data = resp.body
  })

  it("DELETE /todo = delete a todo", () => {

    return request(app)
      .delete(`/todo/${data.data._id}`)
      .expect(200)
      .then((res) => {
        // expect(res.body._id).toBeDefined();
        expect(res.body.success).toBe(true)

      });
  });
});

describe("Get All Todo with pagination", () => {
  let data;
  let page = 1;
  let itemsPerPage = 5
  beforeAll(async () => {
    const resp = await supertest(app)
      .post(`/todo`)
      .send({ title: 'Buy apples get' })

    data = resp.body
  })

  afterAll(async () => {
    await supertest(app)
      .delete(`/todo/${data.data._id}`)
  })

  it("Get /todo = get all todo", () => {

    return request(app)
      .get(`/todo?page=${page}&itemsPerPage=${itemsPerPage}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(typeof res.body.data).toBe('object');
        expect(res.body.success).toBe(true)

      });
  });
});
