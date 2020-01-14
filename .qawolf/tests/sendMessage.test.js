const { launch } = require("qawolf");
const selectors = require("../selectors/sendMessage");

describe('sendMessage', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "http://localhost:8082/" });
  });

  afterAll(() => browser.close());

  it('can type into "message" input', async () => {
    await browser.type(selectors[1], "OK Google");
    await browser.click(selectors[3]);
    const hasAddedMessage = browser.find({css: ".messages-wrapper"});
    expect(hasAddedMessage.innerText).toContain("OK Google")
  });
});
