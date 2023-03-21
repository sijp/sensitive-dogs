import React from "react";

type CallbackFn<T> = (value: T) => void;

function EventBus() {
  const bus =
    typeof document !== "undefined"
      ? document.createComment("event-bus")
      : null;

  return {
    on(eventName: string, callback: CallbackFn<any>) {
      if (!bus) throw "Bus cannot be interacted outside of useEffect";
      bus.addEventListener(eventName, callback);
    },
    off(eventName: string, callback: CallbackFn<any>) {
      if (!bus) throw "Bus cannot be interacted outside of useEffect";
      bus.removeEventListener(eventName, callback);
    },
    dispatch(eventName: string, data: any) {
      if (!bus) throw "Bus cannot be interacted outside of useEffect";
      bus.dispatchEvent(
        new CustomEvent(eventName, {
          detail: data
        })
      );
    }
  };
}

export const EventBusContext = React.createContext(EventBus());

export function useListener<T>(eventName: string) {
  const eventBus = React.useContext(EventBusContext);
  const [data, setData] = React.useState<T | null>(null);
  React.useEffect(() => {
    const cb = (event: CustomEvent) => {
      setData(event.detail);
    };
    eventBus.on(eventName, cb);
    return () => {
      eventBus.off(eventName, cb);
    };
  }, []);

  return data;
}

export function useDispatch<T>(eventName: string) {
  const eventBus = React.useContext(EventBusContext);
  return (data: T) => {
    eventBus.dispatch(eventName, data);
  };
}
