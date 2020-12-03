import addInitMethod from ".";

class Demo {
  constructor(public n: number) {}

  public increment(): number {
    return this.n++;
  }

  public decrement(): number {
    return this.n--;
  }
}

describe("addInitMethod", () => {
  it("should only let methods through after init", async () => {
    const demo = new Demo(0);
    const wrapped = addInitMethod(demo, "decrement");
    expect(wrapped.increment()).toEqual(undefined);
    expect(wrapped.decrement()).toEqual(0);
    expect(wrapped.n).toEqual(-1);
  });
});
