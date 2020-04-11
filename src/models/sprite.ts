import State from './state'
import Result from './result_handling'
import StoryboardObject from './base_object'

export default class Sprite implements StoryboardObject {
  constructor(
    public id: number,
    public path: string,
    public time: string | number,
    public state: State[]
  ) {}
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
  getID(): number {
    return this.id
  }
}
