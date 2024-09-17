/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/** A type safety version to recover a value from the a record object */
const unpack = <V extends unknown>(
  object: Record<string | number, unknown>,
  ...keys: string[]
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keys.reduce((value, key) => (value as any)[key], object) as V;

export default unpack;
