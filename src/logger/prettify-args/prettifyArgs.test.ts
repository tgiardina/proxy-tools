import prettifyArgs from ".";

describe("prettifyArgs", () => {
  it("should prettify empty args", () => {
    expect(prettifyArgs([])).toEqual("");
  });

  it("should prettify undefined args", () => {
    expect(prettifyArgs([undefined])).toEqual("undefined");
  });

  it("should prettify strings", () => {
    expect(prettifyArgs(["test"])).toEqual('"test"');
  });

  it("should prettify object", () => {
    const obj = { a: "a", b: "b" };
    expect(prettifyArgs([obj])).toEqual(JSON.stringify(obj));
  });

  it("should prettify numbers", () => {
    expect(prettifyArgs([0])).toEqual("0");
  });

  it("should prettify multiple args", () => {
    expect(prettifyArgs([0, 1, 2])).toEqual("0, 1, 2");
  });
});
