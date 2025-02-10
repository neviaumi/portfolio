// @ts-expect-error no type here
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onOfflineReady() {
    // eslint-disable-next-line no-console
    console.log('PWA application ready to work offline');
  },
  onRegisteredSW(swScriptUrl: unknown) {
    // eslint-disable-next-line no-console
    console.log('SW registered: ', swScriptUrl);
  },
});
