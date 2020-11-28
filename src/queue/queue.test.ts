import addQueue from ".";

describe("addQueue", () => {
  describe("no error is thrown", () => {
    it("should execute async calls in order", async () => {
      const order: string[] = [];
      const target = {
        fast: (name: string) =>
          new Promise((res) => setTimeout(() => res(order.push(name)), 10)),
        slow: (name: string) =>
          new Promise((res) => setTimeout(() => res(order.push(name)), 20)),
      };
      const wrapped = addQueue(target);
      wrapped.slow("slow");
      wrapped.fast("fast");
      await new Promise((res) => setTimeout(res, 100));
      expect(order).toEqual(["slow", "fast"]);
    });

    it("should correctly handle this for classes", async () => {
      class Demo {
        constructor(public n: number) {}

        public increment(): void {
          this.n++;
        }
      }
      const wrapped = addQueue(new Demo(0));
      wrapped.increment();
      expect(wrapped.n).toEqual(1);
      await new Promise((res) => setTimeout(res, 100)); // Make sure no unhandled promises are thrown.
    });
  });

  describe("error is thrown", () => {
    it("should pass error to handler", async () => {
      const errors: Error[] = [];
      const target = {
        throw: () => {
          throw new Error("Error");
        },
      };
      const wrapped = addQueue(target, (err) => errors.push(err));
      wrapped.throw();
      expect(errors).toEqual([new Error("Error")]);
      await new Promise((res) => setTimeout(res, 100)); // Make sure no unhandled promises are thrown.
    });

    it("should throw error if no handler provided", async () => {
      const target = {
        throw: () => {
          throw new Error("Error");
        },
      };
      const wrapped = addQueue(target);
      expect(() => wrapped.throw()).rejects.toEqual(new Error("Error"));
      await new Promise((res) => setTimeout(res, 100)); // Make sure no unhandled promises are thrown.
    });
  });
});
