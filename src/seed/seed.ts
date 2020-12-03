import * as _ from "lodash";

interface StaticClass<T, U> {
  new (...args: U[]): T;
}

export default function seed<T extends StaticClass<U, V>, U extends object, V>(
  target: T,
  ...wrappers: ((instance: U) => U)[]
): T {
  return new Proxy(target, {
    construct(target, args): U {
      return _.flow(...wrappers)(new target(...args));
    },
  });
}
