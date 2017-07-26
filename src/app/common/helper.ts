export class Helper {
  public static Deserialize(data: string): any {
    return JSON.parse(data, Helper.ReviveDateTime);
  }

  private static ReviveDateTime(key: any, value: any): any {
    if (key.indexOf('Date') > -1 && value) {
      return new Date(value);
    }

    return value;
  }
}
