const {EntityRepository} = require('wetland');

export default class ServiceRepository extends EntityRepository {
  findForUserWithLinks(criteria) {
    let serviceQB = this.getQueryBuilder('s');

    serviceQB
      .populate('s.links', null, 'sl')
      .select('sl')
      .where({user_id: criteria.userID});

    return serviceQB
      .select('s')
      .getQuery()
      .getResult();
  }
};
