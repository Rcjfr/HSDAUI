import { HSDAPage } from './app.po';

describe('hsda App', () => {
  let page: HSDAPage;

  beforeEach(() => {
    page = new HSDAPage();
  });

  xit('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
