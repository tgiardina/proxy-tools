import { addDetour } from "..";
import prettifyArgs from "./prettify-args";

export default function addLogger<T extends object>(
  target: T,
  logger: (str: string) => unknown,
  location?: string
): T {
  return addDetour(target, (prop, args) => {
    let msg = location ? `${location}.` : "";
    msg += prop.toString();
    msg += args ? `(${prettifyArgs(args)})` : "";
    logger(msg);
  });
}
