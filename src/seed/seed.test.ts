import * as _ from "lodash";
import seed from "./";
import { addDetour } from "../";

class Counter {
  constructor(public n: number) {}

  static isPositive(n: number): boolean {
    return n > 0;
  }

  static smallestNaturalNumber = 1;

  public incr(amount?: number): number {
    if (amount !== undefined) {
      this.n += amount;
    } else {
      this.n++;
    }
    return this.n;
  }
}

const tripleCalls = function <T extends object>(target: T): T {
  return addDetour(target, (prop, args) => {
    const og = target[prop];
    if (_.isFunction(og)) {
      og.apply(target, <unknown[]>args);
      og.apply(target, <unknown[]>args);
    }
  });
};

const reset = function (target: Counter): Counter {
  return addDetour(target, () => {
    target.n = 0;
  });
};

const Seeded = seed<typeof Counter, Counter, number>(
  Counter,
  reset,
  tripleCalls
);

describe("seed", () => {
  it("should successfully seed class", async () => {
    const counter = new Seeded(1);
    counter.incr(2);
    expect(counter.n).toEqual(2);
  });

  it("shouldn't affect static properties", () => {
    expect(Seeded.smallestNaturalNumber).toEqual(1);
  });

  it("shouldn't affect static methods", () => {
    expect(Seeded.isPositive(1)).toEqual(true);
  });
});
