import { Helper } from './helper';
import * as moment from 'moment';

describe('JSON Deserialization helper tests', () => {

  it('Should deserialize JSON Dates to appropriate format',
    () => {
      const json = {
        'createDate': '2017-11-16T00:00:00',
        'lastModifiedOn': '2017-11-16T23:09:46.36',
        'statusUpdatedOn': '2017-11-16T23:09:44.417',
        'dueDate': 'COMPLETED',
        'status': 2,
        'completedDate': '2017-11-16T23:09:44.417'
      };
      let jsonString = JSON.stringify(json);
      jsonString = jsonString.replace(/[\u0000-\u001F]+/g, '');
      const data = Helper.Deserialize(jsonString);
      expect(+data.createDate).toBe(+moment('2017-11-16').toDate());
      expect(+data.lastModifiedOn).toBe(+moment.utc('2017-11-16T23:09:46.36').toDate());
      expect(+data.statusUpdatedOn).toBe(+moment.utc('2017-11-16T23:09:44.417').toDate());
      expect(data.dueDate).toBe('COMPLETED');
      expect(data.status).toBe(2);
      expect(+data.completedDate).toBe(+moment.utc('2017-11-16T23:09:44.417').toDate());

    });

});
