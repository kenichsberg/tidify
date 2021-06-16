export function getFirstObjectValue<Type, Key extends keyof Type>(
  objects: Type[] | readonly Type[],
  key: Key
): Type[Key] | undefined {
  if (objects[0] === undefined) return undefined
  return objects[0][key]
}
