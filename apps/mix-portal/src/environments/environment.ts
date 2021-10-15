export interface IEnvironment {
  apiBaseEndpoint: string;
  production: boolean;
}

export const environment: IEnvironment = {
  apiBaseEndpoint: 'https://localhost:5010/api/v2',
  production: false
};
