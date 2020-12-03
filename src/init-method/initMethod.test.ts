import addInitMethod from ".";

class Demo {
  constructor(public n: number) {}

  public increment(): void {
    this.n++;
  }

  public decrement(): void {
    this.n--;
  }
}

describe("addInitMethod", () => {
  it("should only let methods through after init", async () => {
    const demo = new Demo(0);
    const wrapped = addInitMethod(demo, "decrement");
    wrapped.increment();
    wrapped.increment();
    expect(wrapped.n).toEqual(0);
    wrapped.decrement();
    wrapped.increment();
    wrapped.decrement();
    expect(wrapped.n).toEqual(-1);
  });
});
