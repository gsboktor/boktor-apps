import { type AnyFn, type CurryFn } from '@boktor-apps/shared/types/curry';
/**
 *
 * @param targetFn Function to curry
 * @param args Internal container for aggregating arguments in the execution context of this utility function.
 *
 * @template T A function with required arguements.
 * @template Args An arbitrary list of arguements.
 * @returns A curried function of type `CurryFn<typeof targetFn>`
 */
export function toCurry<T extends AnyFn, Args extends unknown[]>(targetFn: T, args?: Args): CurryFn<T> {
  const currentArgs: Args = args ?? <Args>[];
  if (targetFn.length === currentArgs.length) return targetFn(...currentArgs);

  return <CurryFn<T>>((arg: any) => toCurry(targetFn, [...currentArgs, arg]));
}
