import request from 'supertest';
import app from '../lib';

describe('app', () => {
  it('responds with nothing', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  describe('request with query string', () => {
    describe('stub', () => {
      it('responds with the stub', (done) => {
        request(app)
          .get('/?_stub[name]=test')
          .expect(200, {
            name: 'test'
          }, done);
      });
    });

    describe('headers', () => {
      it('responds with the header', (done) => {
        request(app)
          .get('/?_headers[X-Custom]=Test')
          .expect('X-Custom', 'Test')
          .expect(200, done);
      });
    });

    describe('status', () => {
      it('responds with the status', (done) => {
        request(app)
          .get('/?_status=422')
          .expect(422, done);
      });
    });
  });

  describe('request with request body', () => {
    describe('stub', () => {
      it('responds with the stub', (done) => {
        request(app)
          .post('/')
          .send({ _stub: { name: 'test' } })
          .expect(200, {
            name: 'test'
          }, done);
      });
    });

    describe('headers', () => {
      it('responds with the headers', (done) => {
        request(app)
          .post('/')
          .send({ _headers: { 'X-Custom': 'Test' } })
          .expect('X-Custom', 'Test')
          .expect(200, done);
      });
    });

    describe('status', () => {
      it('responds with the status', (done) => {
        request(app)
          .post('/')
          .send({ _status: 422 })
          .expect(422, done);
      });
    });
  });

  describe('request with both request body and query string', () => {
    describe('stub', () => {
      it('responds with the request body stub', (done) => {
        request(app)
          .post('/?_stub[name]=test')
          .send({ _stub: { name: 'somethingelse' } })
          .expect(200, {
            name: 'somethingelse'
          }, done);
      });
    });

    describe('headers', () => {
      it('responds with the request body header', (done) => {
        request(app)
          .post('/?_headers[X-Custom]=Test')
          .send({ _headers: { 'X-Custom': 'Example' } })
          .expect('X-Custom', 'Example')
          .expect(200, done);
      });
    });

    describe('status', () => {
      it('responds with the request body status', (done) => {
        request(app)
          .post('/?_status=422')
          .send({ _status: 404 })
          .expect(404, done);
      });
    });
  });
});
