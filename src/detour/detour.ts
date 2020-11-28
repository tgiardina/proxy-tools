import * as _ from "lodash";

export default function addDetour<T extends object>(
  target: T,
  detour: (prop: keyof T, args?: unknown[]) => unknown
): T {
  return new Proxy(target, {
    get(getTarget: T, prop: keyof T) {
      const og = getTarget[prop];
      if (!_.isFunction(og)) {
        detour(prop);
        return og;
      } else {
        return function (...args: unknown[]) {
          detour(prop, args);
          return og.apply(getTarget, args);
        };
      }
    },
  });
}
