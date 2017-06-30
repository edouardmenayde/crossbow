"use strict";

const assert = require('chai').assert;

const newService = {
  name: 'Trello'
};

var manager;
var Service;

describe('Repositories:Service', () => {

  before(() => {
    manager = sails.wetland.getManager();
    Service = manager.getEntity('Service');
  });

  describe('Create', () => {
    it('Should create new service', done => {
      let service = new Service;

      Object.assign(service, newService);

      manager.persist(service)
        .flush()
        .then(response => {
          assert.equal(response.cleanObjects[0].name, newService.name);
          done();
        })
        .catch(done);
    });
  });

  describe('Remove', () => {
    it('Should remove service', done => {
      manager.getRepository(Service)
        .findOne({name: newService.name})
        .then(user => {
          return manager.remove(user).flush().then(response => {
            assert.equal(response.cleanObjects[0].name, newService.name);
            done();
          });
        })
        .catch(done);
    });
  });

  describe('FindServiceForUserWithLink', () => {
    before(() => {
      const populator = sails.wetland.getPopulator(manager);

      let User      = manager.getEntity('User');
      let user      = new User;
      user.username = 'a';
      user.password = 'a';

      return manager.persist(user).flush()
        .then(() => {
          let ServiceLink = manager.getEntity('ServiceLink');
          let serviceLink = populator.assign(ServiceLink, {
            user: 1
          });

          return manager.persist(serviceLink).flush();
        })
        .then(() => {
          let Service = manager.getEntity('Service');
          let service = populator.assign(Service, {
            name : 'Trelo',
            links: [1]
          });

          return manager.persist(service).flush();
        });
    });

    it('Should find service for user with links', done => {
      manager.getRepository(Service)
        .findForUserWithLinks({
          userID: 1
        })
        .then(services => {
          console.log(services)
          // @TODO: implement real tests when seeder has gone through wetland
          done();
        })
        .catch(done);
    });
  });
});
