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

    let messagesElement = await browser.find({css: ".messages-wrapper"});
    let messagesText = await messagesElement.evaluate(node => node.innerText);
    expect(messagesText).toContain("message to be deleted");

    // delete message
    await browser.click(selectors[3]);

    messagesElement = await browser.find({css: ".messages-wrapper"});
    messagesText = await messagesElement.evaluate(node => node.innerText);
    expect(messagesText).not.toContain("message to be deleted");
  });
});
