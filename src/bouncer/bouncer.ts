import * as _ from "lodash";

export default function addBouncer<T extends object>(
  target: T,
  isAvailable: () => boolean
): T {
  return new Proxy(target, {
    get(getTarget: T, prop: keyof T) {
      const og = getTarget[prop];
      if (!_.isFunction(og)) {
        return og;
      } else {
        if (isAvailable()) {
          return function (...args: unknown[]) {
            og.apply(getTarget, args);
          };
        } else {
          return () => {
            // Don't call the function.
          };
        }
      }
    },
  });
}
