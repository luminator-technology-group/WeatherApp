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

export interface LuminatorWindow {
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
export interface WeatherCoordinates {
  cityName: string;
  temp: number;
  winSpd: number;
  wsymb?: number;
}

export interface WeatherData {
  weatherLookupType: string;
  latitude: number;
  longitude: number;
  data: {
    temp: number;
    winDir: number;
    winSpd: number;
    wsymb: number;
    pmean: number;
    cityName: string;
  };
}

export interface StopData {
  cancelled: boolean;
  designation: string;
  estimatedTimeOfArrivalRelative: number;
  isTimingPoint: boolean;
  latitude: number;
  longitude: number;
  minutesFromPrevious: number;
  name: string;
  name_Multilanguage: { [key: string]: string };
  offsetTime: number;
  expectedArrivalTime: string;
}
