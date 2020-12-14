import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
dotenv.config();

const ENV_VARIABLES = {
  NODE_ENV: '',
  PORT: '',
  TORRE_SEARCH_URL: '',
  TORRE_JOBS_PATH: ''
};
type EnvVariablesType = typeof ENV_VARIABLES;

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvVariablesType;

  constructor() {
    const envVars = ENV_VARIABLES;
    Object.keys(ENV_VARIABLES).forEach((name) => (envVars[name] = this.getEnvVar(name)));
    this.envConfig = this.validateInput(envVars);
  }

  private getEnvVar(name: string): string {
    return process.env[name];
  }

  private validateInput(envConfig: EnvVariablesType): EnvVariablesType {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().default('local').valid('local', 'develop', 'production', 'test'),
      PORT: Joi.number().default(3000),
      TORRE_SEARCH_URL: Joi.string().required(),
      TORRE_JOBS_PATH: Joi.string().required()
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(error);
    }
    return validatedEnvConfig;
  }

  get env(): string {
    return String(this.envConfig.NODE_ENV);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get torreSearchUrl(): string {
    return String(this.envConfig.TORRE_SEARCH_URL);
  }

  get torreJobsPath(): string {
    return String(this.envConfig.TORRE_JOBS_PATH);
  }

  get(key: string): string {
    const variable = this.getEnvVar(key);
    if (!variable) {
      throw new Error('Config variable does not exist: ' + key);
    }

    return variable;
  }
}
