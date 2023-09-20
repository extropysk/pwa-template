import {
  ConsoleInstrumentation,
  ErrorsInstrumentation,
  EventAttributes,
  SessionInstrumentation,
  faro,
  initializeFaro,
} from "@grafana/faro-web-sdk";
import { getEnv } from "./config.utils";

export const initFaro = () => {
  const faro = getEnv("VITE_FARO");
  if (faro) {
    initializeFaro({
      url: faro,
      app: {
        name: getEnv("VITE_APP_NAME"),
        version: getEnv("VITE_APP_VERSION"),
        environment: getEnv("MODE"),
      },
      instrumentations: [
        new ErrorsInstrumentation(),
        new ConsoleInstrumentation(),
        new SessionInstrumentation(),
      ],
    });
  }
};

export const pushFaroEvent = (name: string, attributes?: EventAttributes) => {
  faro.api?.pushEvent(name, attributes);
};
