import * as _ from "lodash";

export default function addInit<T extends object>(
  target: T,
  initMethod: string
): T {
  let isInit = false;
  return new Proxy(target, {
    get(getTarget: T, prop: keyof T) {
      const og = getTarget[prop];
      if (!_.isFunction(og)) {
        return og;
      } else {
        if (prop === initMethod) {
          isInit = true;
        }
        if (isInit) {
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
