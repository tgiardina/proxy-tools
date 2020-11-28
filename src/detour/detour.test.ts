import addDetour from ".";

describe("addDetour", () => {
  it("should take detour before accessing property", async () => {
    const calls: string[] = [];
    const target = {
      prop: "string",
    };
    const wrapped = addDetour(target, (prop) => calls.push(prop));
    expect(wrapped.prop).toEqual("string");
    expect(calls).toEqual(["prop"]);
  });

  it("should take detour before calling method", async () => {
    const pings: string[] = [];
    const calls: string[] = [];
    const target = {
      ping: (name: string) => pings.push(`ping ${name}`),
    };
    const wrapped = addDetour(target, (prop, args) => {
      if (!args) return;
      calls.push(`${prop}(${args[0]})`);
    });
    wrapped.ping("test");
    expect(pings).toEqual(["ping test"]);
    expect(calls).toEqual(["ping(test)"]);
  });
});
