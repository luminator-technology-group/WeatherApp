export type LibPisState =
  | 'Normal'
  | 'Fallback'
  | 'RecoverableError'
  | 'PermanentError'
  | 'Startup';

export interface MQTTConfiguration {
  hostname: string;
  port: number;
  username?: string;
  password?: string;
  lastWillTopic?: string;
  lastWillPayload?: Record<string, unknown>;
  lastWillRetain?: boolean;
  lastWillQos?: number;
}

export interface InitParams {
  displayId: string;
  externalConfig?: MQTTConfiguration;
  decrementCallSequenceOnArrival?: boolean;
  preview?: boolean;
}

export interface LuminatorWindow  {
  luminator: {
    pis: {
      client: any;
      init({
        displayId,
        externalConfig,
        decrementCallSequenceOnArrival,
        preview,
      }: InitParams): void;
    };
  };
}

export interface Stop {
  name: string;
  lineNumber: number;
  // Define other properties as needed
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}