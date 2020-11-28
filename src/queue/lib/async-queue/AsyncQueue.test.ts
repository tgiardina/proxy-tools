import AsyncQueue from ".";

const order: string[] = [];
const asyncFunction = async (str: string): Promise<void> => {
  new Promise((res) => {
    setTimeout(() => res(order.push(str)), 10);
  });
};

describe("AsyncQueue", () => {
  describe("no error is thrown", () => {
    it("should empty queue multiple times", async () => {
      const queue = new AsyncQueue();
      queue.enqueue(() => asyncFunction("first"));
      await new Promise((res) => setTimeout(res, 100));
      queue.enqueue(() => asyncFunction("second"));
      await new Promise((res) => setTimeout(res, 100));
      expect(order).toEqual(["first", "second"]);
    });
  });
});
