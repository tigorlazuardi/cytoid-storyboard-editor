interface MapFns<T, E, TResult, EResult> {
  Ok: (a: T) => TResult
  Err: (a: E) => EResult
}
/**
 * Creates result/error handler with typesafety for either async or sync operations. No more throws where typesafety disappears.
 * 'when' for synchronous. 'When' for asynchronous.
 *
 * Synchronous Operation Example:
 *
 * ```typescript
 * const foo = (): Result<number, string> => {
 *    if (Math.random() < 0.5) {
 *      return Result.Ok(5)
 *    }
 *
 *    return Result.Err("oh no")
 * }
 * foo().when({
 *    Ok : result => console.log(result), // result typed as number: 5
 *    Err: error  => console.log(error)   // result typed as string: "oh no"
 * })
 * ```
 *
 * Async example:
 *
 * ```typescript
 * const foo = (): Promise<Result<number, string>> => {
 *    if (Math.random() < 0.5) {
 *        return Promise.resolve(5).then(Result.Success);
 *    }
 *
 *    return Promise.resolve(Result.Failure("oh no"));
 * };
 * foo().then(
 *    Result.When({
 *        Ok  : result => console.log(result), // result typed as number
 *        Err : error  => console.log(error)   // result typed as string
 *    })
 * );
 * ```
 */
export default class Result<TSuccess, TError> {
  constructor(
    private success: TSuccess,
    private error: TError,
    private isError: boolean
  ) {}
  public static Ok<T>(success: T) {
    return new Result<T, any>(success, null, false)
  }
  public static Err<T>(error: T) {
    return new Result<any, T>(null, error, true)
  }
  when<T, E>(mapFns: MapFns<TSuccess, TError, T, E>) {
    return this.isError ? mapFns.Err(this.error) : mapFns.Ok(this.success)
  }
  public static When = <T, E, TResult, TError>(
    mapFns: MapFns<T, E, TResult, TError>
  ) => (result: Result<T, E>) => {
    return result.when(mapFns)
  }
}
