import addAirlock from ".";

class Demo {
  constructor(public n: number) {}

  public increment(): void {
    this.n++;
  }

  public decrement(): void {
    this.n--;
  }

  public double(): void {
    this.n = 2 * this.n;
  }
}

describe("addAirlock", () => {
  it("should properly open", () => {
    const demo = addAirlock(new Demo(0), ["decrement"]);
    demo.increment();
    demo.increment();
    expect(demo.n).toEqual(0);
    demo.decrement();
    expect(demo.n).toEqual(1);
    demo.decrement();
    expect(demo.n).toEqual(0);
  });

  it("should properly eject", () => {
    const demo = addAirlock(new Demo(0), ["double"], ["decrement"]);
    demo.increment();
    demo.increment();
    demo.decrement();
    demo.double();
    expect(demo.n).toEqual(-2);
  });
});
