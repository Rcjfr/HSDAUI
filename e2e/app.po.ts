import { browser, element, by } from 'protractor';

export class HSDAPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('aa-root h1')).getText();
  }
}
