const {EntityRepository} = require('wetland');

export default class ServiceRepository extends EntityRepository {
  findForUserWithLinks() {
    let queryBuilder = this.getQueryBuilder('s');

    return queryBuilder
      .select('s', 'sl')
      .leftJoin('s.links', 'sl')
      // @TODO: restrict to user
      // .join('leftJoin', 'servicelink', 'sl', {
      //   'sl.service_id': 's.id',
      //   'sl.user_id'   : criteria.userID
      // })
      .getQuery()
      .getResult();
  }
};
