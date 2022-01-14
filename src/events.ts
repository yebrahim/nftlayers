import mixpanel from 'mixpanel-browser';

export enum EVENTS {
  init,
  preview_ok,
  preview_err,
  preview_download_ok,
  preview_download_err,
  export_ok,
  export_err,
}

export function init() {
  if (process.env.NODE_ENV !== 'development') {
    mixpanel.init('b03ed910ce2c07ef1797f10510878780');
    sendEvent(EVENTS.init);
  }
}

export function sendEvent(e: EVENTS, body?: unknown) {
  if (process.env.NODE_ENV !== 'development') {
    mixpanel.track(EVENTS[e], { body });
  }
}
