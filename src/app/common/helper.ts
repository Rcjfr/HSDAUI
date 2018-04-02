import * as moment from 'moment';
import * as _ from 'lodash';
export class Helper {
  public static Deserialize(data: string): any {
    return JSON.parse(data, Helper.ReviveDateTime);
  }

  private static ReviveDateTime(key: any, value: any): any {
    if (typeof key === 'string' && ((key.indexOf('lastModifiedOn') > -1 || key.indexOf('statusUpdatedOn') > -1)) && value) {
      const date = new Date(moment.utc(value).valueOf());

      return date;
    }
    if (typeof key === 'string' && ((key === 'createDate'))) {
      const date = new Date(moment(value).valueOf());

      return date;
    }
    if (typeof key === 'string' && ((key === 'dueDate'))) {
      return value;
    }

    if (typeof key === 'string' && ((key.indexOf('Date') > -1))) {
      return new Date(moment.utc(value).valueOf());
    }

    return value;
  }

public static RemoveNulls(criteriaObj: Object) {
  const criteriaObject = {} ;
  const criteria = _.pickBy(criteriaObj, _.identity)
  _.forIn(criteria, (value, key) => {
      const final = _.omitBy(value,  function(x: any) {
      const check = x === null ||
      x === '' ||
      x === undefined ||
      (_.isObject(x) && _.isEmpty(x)) ||
      (_.isArray(x) && x.length === 0);

     return check;
     } )

     if (!_.isEmpty(final)) {
      criteriaObject[key] = final
     }

  })

  return criteriaObject;

  }
}
