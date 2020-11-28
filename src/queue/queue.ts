import * as _ from "lodash";
import AsyncQueue from "./lib/async-queue";

export default function addQueue<T extends object>(
  target: T,
  errHandler?: (err: Error) => unknown
): T {
  const queue = new AsyncQueue();
  return new Proxy(target, {
    get(getTarget: T, prop: keyof T) {
      const og = getTarget[prop];
      if (!_.isFunction(og)) {
        return og;
      } else {
        return function (...args: unknown[]) {
          return new Promise((res) => {
            queue.enqueue(async () => {
              try {
                res(await og.apply(getTarget, args));
              } catch (err) {
                if (errHandler) {
                  errHandler(err);
                  res(err);
                }
              }
            });
          });
        };
      }
    },
  });
}
