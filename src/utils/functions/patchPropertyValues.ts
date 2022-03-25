/**
 * copies passed object, modefies given properties by given callback and returns it.
 * (doesn't destroy the passed object)
 *
 * @param obj - An object to be modefied
 * @param callback - A callback which modefies certain property values of obj
 * @param args - Property names of obj, which should be applied the callback
 * @returns - modified new object
 */
export function patchPropertyValues<ObjectType extends Record<string, any>>(
  obj: ObjectType,
  callback: (arg0: any) => any,
  ...args: Array<keyof ObjectType>
): ObjectType {
  const copied = { ...obj }
  args.forEach((arg) => {
    copied[arg] = callback(copied[arg])
  })
  return copied
}
