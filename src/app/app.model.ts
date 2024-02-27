import { InitParams } from "@msetsuite/libpis";

export interface LuminatorWindow extends Window {
    luminator: {
      pis: {
        client: any;
        init({
               displayId, externalConfig, decrementCallSequenceOnArrival, preview,
             }: InitParams): void
      };
    };
  }