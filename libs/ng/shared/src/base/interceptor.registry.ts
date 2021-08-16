export enum InterceptorType {
  Authentication = 'AUTHENTICATION_INTERCEPTOR',
  ErrorHandling = 'ERROR_HANDLING_INTERCEPTOR',
  Spinner = 'SPINNER_INTERCEPTOR'
}

export interface IInterceptor {
  key: string;
  type: InterceptorType;
}

export class InterceptorRegistry {
  private _registry: IInterceptor[] = [];

  constructor(interceptors: IInterceptor[]) {
    this._registry = interceptors;
  }

  public register(interceptor: IInterceptor): InterceptorRegistry {
    if (!interceptor) {
      return this;
    }

    this._registry.push(interceptor);

    return this;
  }

  public replace(type: InterceptorType, interceptor: IInterceptor): InterceptorRegistry {
    this._registry = this._registry.filter((i: IInterceptor) => i.type !== type);

    return this.register(interceptor);
  }

  public toJSON(): string {
    return JSON.stringify(this._registry.map((i: IInterceptor) => i.key));
  }
}

export const DEFAULT_INTERCEPTORS: IInterceptor[] = [
  {
    key: InterceptorType.Authentication,
    type: InterceptorType.Authentication
  },
  {
    key: InterceptorType.ErrorHandling,
    type: InterceptorType.ErrorHandling
  },
  {
    key: InterceptorType.Spinner,
    type: InterceptorType.Spinner
  }
];
