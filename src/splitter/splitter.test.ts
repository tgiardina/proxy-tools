import addSplitter from "./";

class Counter {
  constructor(public n: number) {}

  public add(...amounts: number[]): number {
    if (amounts[1] !== undefined) throw new Error();
    this.n += amounts[0];
    return this.n;
  }
}

const wrapped = addSplitter(new Counter(0));

describe("apply", () => {
  it("should return last output", async () => {
    expect(wrapped.add(1, 2, 3)).toEqual(6);
  });

  it("should not affect property access", async () => {
    expect(wrapped.n).toEqual(6);
  });
});
