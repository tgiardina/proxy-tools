import * as _ from "lodash";

type Generator = () => unknown;

export default function addAirlock<T extends object>(
  target: T,
  openers: (keyof T)[],
  ejectors?: (keyof T)[]
): T {
  let queue: Generator[] = [];
  const dequeueAll = () => {
    while (queue.length) {
      const generator = <Generator>queue.shift();
      generator();
    }
  };
  return new Proxy(target, {
    get: (getTarget: T, prop: keyof T) => {
      const og = getTarget[prop];
      if (!_.isFunction(og)) return og;
      return function (...args: unknown[]) {
        if (ejectors?.includes(prop)) queue = [];
        queue.push(() => {
          og.apply(getTarget, args);
        });
        if (openers.includes(prop)) dequeueAll();
      };
    },
  });
}
