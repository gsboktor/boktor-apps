export type AnyFn = (...args: any[]) => any;

/**
 * @template Fn Any function with required arguements
 * @template CurrentParam Current function parameter being evaluated in the type signature
 * @template RestParam Lingering required parameters in the tuple.
 * @description A utility type signature for defining a curried function with arbitrary N-length arguments. Function arguements are only picked up by the type signature if required in the function signature. Object-like parameters are not destructured.
 */
export type CurryFn<Fn extends AnyFn> = Parameters<Fn> extends [infer CurrentParam, ...infer RestParam]
  ? (arg: CurrentParam) => CurryFn<(...args: RestParam) => ReturnType<Fn>>
  : ReturnType<Fn>;
