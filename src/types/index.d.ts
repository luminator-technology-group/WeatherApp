import { InitParams} from '../app/app.model';

export {};

export interface IFiler {
  mkdir(
    path: string,
    options?: { mode?: number | string; recursive?: boolean },
    callback?: Function
  ): void;
  exists(
    path: string,
    callback?: Function
    ): void;
  writeFile(
    path: string,
    data: string[] | undefined,
    encoding: string,
    callback: (error: Error) => void
  ): void;
}
declare global {
  interface Window {
    Filer: {
      fs: IFiler;
    };
    luminator: {
      pis: {
        client: any;
        init(params: InitParams): void;
      };
    };
  }
}


