type ControllerFactory<TDeps, TController> = (deps: TDeps) => TController;


export function create_Controller<TDeps, TController>(
  factory: ControllerFactory<TDeps, TController>
) {
  return (deps: TDeps): TController => {
    return factory(deps);
  };
}

export type ControllerInstance<T extends (...args: any) => any> =
  ReturnType<T>;
