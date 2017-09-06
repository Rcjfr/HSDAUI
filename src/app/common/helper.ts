import * as moment from 'moment';

export class Helper {
  public static Deserialize(data: string): any {
    return JSON.parse(data, Helper.ReviveDateTime);
  }

  private static ReviveDateTime(key: any, value: any): any {
    if ((key.indexOf('Date') > -1 || key.indexOf('lastModifiedOn') > -1 || key.indexOf('statusUpdatedOn') > -1) && value) {
      const date = Helper.convertUTCDateToLocalDate(new Date(value));

      return date;
    }

    return value;
  }
  //https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time-using-javascript
  private static convertUTCDateToLocalDate(date: Date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }
}
