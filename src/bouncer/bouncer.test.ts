import addBouncer from ".";

class Demo {
  constructor(public n: number) {}

  public increment(): void {
    this.n++;
  }
}

describe("addBouncer", () => {
  it("should correctly bounce when not available", async () => {
    const demo = new Demo(0);
    const isAvailable = () => demo.n <= 0;
    const wrapped = addBouncer(demo, isAvailable);
    wrapped.increment();
    wrapped.increment();
    expect(wrapped.n).toEqual(1);
  });
});
