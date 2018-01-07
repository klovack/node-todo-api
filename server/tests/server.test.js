const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123,
}];

beforeEach((done) => {
  Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done()).catch(e => console.log(e));
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
        Todo.find({ text }).then((dbTodos) => {
          expect(dbTodos.length).toBe(1);
          expect(dbTodos[0].text).toBe(text);
          return done();
        }).catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          return done();
        }).catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const dummyId = new ObjectID().toHexString;

    request(app)
      .get(`/todos/${dummyId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is not valid', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    const hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toNotExist();
            done();
          }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    const dummyId = new ObjectID().toHexString;

    request(app)
      .delete(`/todos/${dummyId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is not valid', (done) => {
    request(app)
      .delete('/todos/1234')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo text', (done) => {
    const hexId = todos[0]._id.toHexString();

    const updatedTodo = {
      text: 'Updated',
      completed: true,
    };

    request(app)
      .patch(`/todos/${hexId}`)
      .send(updatedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(updatedTodo.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

  });

  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todos[1]._id.toHexString();

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ text: 'Updated', completed: false })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('Updated');
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.completedAt).toNotExist();
      })
      .end(done);
  });
});
