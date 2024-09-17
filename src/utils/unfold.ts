/** Same as "Object.entries" but ensures the types */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const unfold = <K extends string | number, V extends unknown>(
  object: Record<K, V>
) => Object.entries(object) as [K, V][];

export default unfold;
