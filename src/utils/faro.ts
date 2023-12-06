import {
  ConsoleInstrumentation,
  ErrorsInstrumentation,
  EventAttributes,
  LogLevel,
  SessionInstrumentation,
  faro,
  initializeFaro,
} from "@grafana/faro-web-sdk";

export const initFaro = () => {
  const faro = import.meta.env.VITE_FARO;
  if (faro) {
    initializeFaro({
      url: faro,
      app: {
        name: "pwa",
        version: process.env.APP_VERSION,
        environment: import.meta.env.MODE,
      },
      instrumentations: [
        new ErrorsInstrumentation(),
        new ConsoleInstrumentation({
          disabledLevels: [LogLevel.DEBUG, LogLevel.TRACE],
        }),
        new SessionInstrumentation(),
      ],
    });
  }
};

export const pushFaroEvent = (name: string, attributes?: EventAttributes) => {
  faro.api?.pushEvent(name, attributes);
};
