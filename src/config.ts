import { Remote } from 'electron'
import yaml from 'js-yaml'
import * as fs from 'fs'
import Result from './models/result_handling'

const loadLocation = './config.yaml'
const defaultLocation = './default_config.yaml'

interface Variable {
  HideBarOnScroll: boolean
  [key: string]: any
}

interface _V {
  [key: string]: (value: any) => Result<any, string>
}

const validationSchema: _V = {
  HideBarOnScroll(value: any): Result<any, string> {
    switch (typeof value) {
      case 'boolean':
        return Result.Ok(value)
      default:
        return Result.Err(
          `'HideBarOnScroll' key wants value 'boolean', but get ${typeof value} instead`
        )
    }
  },
}

class Config {
  public env: Variable
  constructor() {
    this.env = {
      HideBarOnScroll: true,
    }
  }
  load(): Result<boolean, string> {
    try {
      const doc: Variable = yaml.safeLoad(
        fs.readFileSync(loadLocation, 'utf-8')
      )
      for (const k in Object.keys(validationSchema)) {
        validationSchema[k](doc[k]).when({
          ok: (value: any) => (this.env[k] = value),
          fail: (err: string) => console.log(err),
        })
      }
      this.env = doc
      return Result.Ok(true)
    } catch {
      const z = yaml.safeDump(this.env, { sortKeys: true })
      fs.writeFileSync(loadLocation, z)
      return Result.Err('Loaded default config')
    }
  }
}

const remote: Remote = window.require('electron').remote
console.log(remote)
// const fs = remote.require('fs')
//

const config = new Config()

export default config
