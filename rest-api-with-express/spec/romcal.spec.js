import * as chai from 'chai';
import chaiHttp, { request } from 'chai-http';
import app from '../app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /romcal/general-roman/:locale/{:year}', () => {
  it('should return the General Roman Calendar for the French locale', async () => {
    const res = await request.execute(app).get('/romcal/general-roman/fr/2021');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('2021-01-01');
    const day = res.body['2021-01-01'];
    expect(day).to.be.an('array');
    expect(day[0]).to.have.property('id', 'mary_mother_of_god');
    expect(day[0]).to.have.property('date', '2021-01-01');
  });

  it('should return a 404 error if the locale is not found', async () => {
    const res = await request.execute(app).get('/romcal/general-roman/xx/2021');

    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('code', 404);
    expect(res.body).to.have.property('message', "The provided locale doesn't exists");
  });
});

describe('GET /romcal/france/fr/{:year}', () => {
  it('should return the French calendar for the year 2021', async () => {
    const res = await request.execute(app).get('/romcal/france/fr/2021');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('2021-01-01');
    const day = res.body['2021-01-01'];
    expect(day).to.be.an('array');
    expect(day[0]).to.have.property('id', 'mary_mother_of_god');
    expect(day[0]).to.have.property('date', '2021-01-01');
  });
});
