import addTranslator from ".";

class Counter {
  constructor(public n: number) {}

  public add(amount: number): number {
    this.n += amount;
    return this.n;
  }
}

describe("apply", () => {
  it("should apply function to method input", async () => {
    const wrapped = addTranslator(new Counter(0), (...args: number[]) => [
      2 * args[0],
    ]);
    expect(wrapped.add(1)).toEqual(2);
  });

  it("should not affect property access", async () => {
    const wrapped = addTranslator(new Counter(0), (...args: number[]) => [
      2 * args[0],
    ]);
    expect(wrapped.n).toEqual(0);
  });
});
