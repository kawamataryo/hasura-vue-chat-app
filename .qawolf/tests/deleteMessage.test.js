const { launch } = require("qawolf");
const selectors = require("../selectors/deleteMessage");

describe('deleteMessage', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "http://localhost:8084/" });
  });

  afterAll(() => browser.close());

  it('delete message', async () => {
    // send message
    await browser.type(selectors[1], "message to be deleted");
    await browser.click(selectors[2]);

    const hasMessage = await browser.hasText("message to be deleted");
    expect(hasMessage).toEqual(true);

    const messagesElement = await browser.find({css: ".messages-wrapper"});
    const messagesText = await messagesElement.evaluate(node => node.innerText);
    expect(messagesText).toContain("message to be deleted");

    // delete message
    await browser.click(selectors[3]);
    expect(hasMessage).toEqual(false);
  });
});
