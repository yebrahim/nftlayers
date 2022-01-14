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

export function sendEvent(e: EVENTS, body?: unknown) {
  mixpanel.track(EVENTS[e], { body });
}
