import "fast-text-encoding";
import "react-native-url-polyfill/auto";

if (typeof global.BroadcastChannel === "undefined") {
  // @ts-ignore
  global.BroadcastChannel = class BroadcastChannel {
    name: string;
    onmessage: ((event: { data: any }) => void) | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_message: any) {
      // no-op in React Native
    }

    close() {
      // no-op
    }
  };
}

// Minimal EventTarget shim
if (typeof global.EventTarget === "undefined") {
  // @ts-ignore
  global.EventTarget = class EventTarget {
    private listeners: Record<string, Function[]> = {};

    addEventListener(type: string, callback: Function) {
      (this.listeners[type] ||= []).push(callback);
    }

    removeEventListener(type: string, callback: Function) {
      this.listeners[type] = (this.listeners[type] || []).filter(
        (cb) => cb !== callback
      );
    }

    dispatchEvent(event: { type: string }) {
      (this.listeners[event.type] || []).forEach((cb) => cb.call(this, event));
      return true;
    }
  };
}

// Barebones Event shim
if (typeof global.Event === "undefined") {
  // @ts-ignore
  global.Event = class Event {
    type: string;
    constructor(type: string) {
      this.type = type;
    }
  };
}

// Provide a minimal MessageEvent shim if RN doesn’t have one
if (typeof global.MessageEvent === "undefined") {
  // @ts-ignore
  global.MessageEvent = class MessageEvent {
    type: string;
    data: any;
    constructor(type: string, eventInitDict?: { data?: any }) {
      this.type = type;
      this.data = eventInitDict?.data;
    }
  };
}
