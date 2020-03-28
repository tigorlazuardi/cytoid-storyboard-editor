interface MapFns<T, E, TResult, EResult> {
  ok: (a: T) => TResult
  fail: (a: E) => EResult
}

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
    return this.isError ? mapFns.fail(this.error) : mapFns.ok(this.success)
  }
}
