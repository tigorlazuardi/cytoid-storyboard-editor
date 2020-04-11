import yaml from 'js-yaml'
import Result from './models/result_handling'
import * as fs from 'fs'

const loadLocation = './config.yaml'

interface Variable {
  HideBarOnScroll: boolean
  [key: string]: any
}

interface Validate {
  [key: string]: (value: any) => Result<any, string>
}

const validationSchema: Validate = {
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
  env: Variable
  constructor() {
    this.env = {
      HideBarOnScroll: true,
    }
  }
  public init(): Result<boolean, string[]> {
    try {
      const doc: Variable = yaml.safeLoad(
        fs.readFileSync(loadLocation, 'utf-8')
      )
      const errors = this.validate(doc)
      return errors.length > 0 ? Result.Ok(true) : Result.Err(errors)
    } catch {
      const z = yaml.safeDump(this.env, { sortKeys: true })
      fs.writeFileSync(loadLocation, z)
      return Result.Err(['No config found. Using default config'])
    }
  }
  public changeConfig(config: Variable): Result<boolean, string[]> {
    const errors = this.validate(config)
    return errors.length > 0 ? Result.Ok(true) : Result.Err(errors)
  }
  private validate(env: Variable): string[] {
    const errors: string[] = []
    for (const k in Object.keys(validationSchema)) {
      validationSchema[k](env[k]).when({
        Ok: (value: any) => (this.env[k] = value),
        Err: (err: string) => errors.push(err),
      })
    }
    return errors
  }
}

const config = new Config()

export default config
