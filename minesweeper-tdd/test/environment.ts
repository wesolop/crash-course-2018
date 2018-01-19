import * as testkit from 'wix-bootstrap-testkit';
import * as configEmitter from 'wix-config-emitter';

export const app = bootstrapServer();

export function beforeAndAfter() {
  before(() => emitConfigs());
  app.beforeAndAfter();
}

function emitConfigs() {
  return configEmitter({sourceFolders: ['./templates'], targetFolder: './target/configs'})
    .fn('scripts_domain', 'static.parastorage.com')
    .fn('static_url', 'com.wixpress.crash.minesweeper-tdd', 'http://localhost:3200/')
    .emit();
}

function bootstrapServer() {
  return testkit.app('./index', {
    env: {
      PORT: 3100,
      MANAGEMENT_PORT: 3104,
      NEW_RELIC_LOG_LEVEL: 'warn',
      DEBUG: ''
    }
  });
}
