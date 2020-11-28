
## ProxyTools

[![tgiardina](https://circleci.com/gh/tgiardina/proxy-tools.svg?style=shield)](https://circleci.com/gh/tgiardina/proxy-tools.svg?style=shield)

Thin wrappers that use JavaScript's `Proxy` class.

### Documentation
Jump to tool:
- [addAirlock](#addairlockttarget-t-unlockers-typeof-t-ejectors-typeof-t)
- [addBouncer](#addbouncerttarget-t-isavailable---boolean)
- [addDetour](#adddetourttarget-t-detour-prop-keyof-t-args-unknown--void)
- [addLogger](#addloggerttarget-t-logger-str-string--void-location-string)
- [addQueue](#addqueuettarget-t-errhandler-err-error--void)

#### `addAirlock<T>(target: T, unlockers: (typeof T)[], ejectors: (typeof T)[])`
- Stores all calls to `target` that don't match either `unlockers` or `ejectors`.
- If a method is called that matches `unlockers`, calls all stored methods and the unlocker method (in order).
- If a method is called that matches `ejectors`, forgets all stored methods and then stores the ejector method.
```
const counter = addAirlock(new Counter(0), ["increment"], ["decrement"]);
counter.increment();
assert.equals(counter.count, 1);
counter.double();
assert.equals(counter.count, 1);
counter.decrement();
assert.equals(counter.count, 1);
counter.increment();
assert.equals(counter.count, 1);
```

#### `addBouncer<T>(target: T, isAvailable: () => boolean)`

- Blocks all method calls to `target` while is `isAvailable` returns false.

```
const isAvailable = true;
const counter = addBouncer(new Counter(0), () => isAvailable);
counter.increment();
assert.equals(counter.count, 1);
isAvailable = false;
counter.double();
assert.equals(counter.count, 1);
isAvailable = true;
counter.decrement();
assert.equals(counter.count, 0);
```


#### `addDetour<T>(target: T, detour: (prop: keyof T, args?: unknown[]) => void)`

- Provides `detour` with `target`'s traffic.
- If a property of `target` is being accessed, will pass the callback `callback(${propertyName}, undefined)`.
- If a method of target is being called, will pass the callback `callback(${methodName}, ${methodArgs})`.

```
const counter = addDetour(new Counter(0), console.log);
counter.increment();
// > increment [];
counter.double();
// > increment []
counter.count
// > count undefined
```

#### `addLogger<T>(target: T, logger: (str: string) => void, location?: string)`

- Logs `target`'s traffic.
- If property of `target` is being access, will pass logger `${location}.${propertyName}`.
- If method of `target` is being called, will pass logger `${location}.${methodName}(${methodArgs})`.
- 
```
const counter = addLogger(new Counter(0), console.log, "counter");
counter.increment();
// > counter.increment()
counter.double();
// > counter.double()
counter.count
// > counter.count``
```

#### `addQueue<T>(target: T, errHandler?: (err: Error) => void)`

- Ensures that `async` methods are executed in order.
- Passes unhandled Promise errors to `errHandler`.

```
const waiter = addQueue({
  async waitOneSecond() { 
    // ...
    console.log("Waited one second");
  }
  async waitTenSeconds() {
    // ...
    console.log("Waited ten seconds");
  }
});
waiter.waitTenSeconds();
waiter.waitOneSecond();
// 10 seconds later > "Waited ten seconds"
// Then 1 second later > "Waited one second"
```
