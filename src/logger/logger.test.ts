import addLogger from ".";

describe("addLogger", () => {
  let msgs: string[];
  const logger = (msg: string) => msgs.push(msg);

  beforeEach(() => {
    msgs = [];
  });

  it("should log before accessing property", () => {
    const target = {
      prop: "string",
    };
    const wrapped = addLogger(target, logger);
    wrapped.prop;
    expect(msgs).toEqual(["prop"]);
  });

  it("should log before calling method", () => {
    const target = {
      ping: jest.fn(),
    };
    const wrapped = addLogger(target, logger, "loc");
    wrapped.ping("hi");
    expect(msgs).toEqual(['loc.ping("hi")']);
  });
});
