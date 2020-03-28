import State from './state'
import Result from './result_handling'

export default class Sprite {
  public id: number
  public path: string
  public time: string | number
  public state: State[]
  constructor(id: number, path: string, time: string | number) {
    this.id = id
    this.path = path
    this.time = time
    this.state = []
  }
  addNewState(state: State) {
    this.state.push(state)
  }
  updateState(index: number, state: State): Result<boolean, string> {
    if (this.state[index]) {
      this.state[index] = state
      return Result.Ok(true)
    } else {
      return Result.Err('State on the index does not exist.')
    }
  }
  deleteState(index: number): Result<boolean, string> {
    if (this.state[index]) {
      this.state.splice(index, 1)
      return Result.Ok(true)
    } else {
      return Result.Err('State on the index does not exist.')
    }
  }
}
