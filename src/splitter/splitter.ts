import * as _ from "lodash";

export default function addSplitter<T extends object>(target: T): T {
  return new Proxy(target, {
    get(getTarget: T, prop: keyof T) {
      const og = getTarget[prop];
      if (!_.isFunction(og)) {
        return og;
      } else {
        return function (...args: unknown[]) {
          let output;
          args.map((arg) => {
            output = og.apply(getTarget, [arg]);
          });
          return output;
        };
      }
    },
  });
}
