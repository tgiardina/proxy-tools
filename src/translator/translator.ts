import * as _ from "lodash";

export default function addTranslator<T extends object, U, V>(
  target: T,
  fn: (...args: U[]) => V[]
): T {
  return new Proxy(target, {
    get(getTarget: T, prop: keyof T) {
      const og = getTarget[prop];
      if (!_.isFunction(og)) {
        return og;
      } else {
        return function (...args: U[]) {
          return og.apply(getTarget, fn(...args));
        };
      }
    },
  });
}
