export default function prettifyArgs(args: unknown[]): string {
  return [...args]
    .map((argument) => {
      if (typeof argument === "string") return `"${argument}"`;
      if (typeof argument === "object") return JSON.stringify(argument);
      if (argument === undefined) return "undefined";
      return argument;
    })
    .join(", ");
}
