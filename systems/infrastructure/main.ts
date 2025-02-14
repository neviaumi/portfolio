import {
  pagesProject,
  provider,
  workersScript,
} from '@cdktf/provider-cloudflare';
import { App, TerraformStack } from 'cdktf';

class MyStack extends TerraformStack {
  constructor(scope: App, id: string) {
    super(scope, id);
    new provider.CloudflareProvider(this, 'cloudflare', {
      apiToken: process.env['CF_API_TOKEN'],
    });

    new pagesProject.PagesProject(this, 'ai-assistant-web-components', {
      accountId: process.env['CF_ACCOUNT_ID']!,
      name: 'ai-assistant-web-components',
      productionBranch: 'main',
    });

    new workersScript.WorkersScript(this, 'ai-assistant-worker', {
      accountId: process.env['CF_ACCOUNT_ID']!,
      content: `addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response("Hello World!");
}`,
      scriptName: 'ai-assistant-worker',
    }).addOverride('lifecycle.ignore_changes', ['content']);
  }
}

const app = new App();
new MyStack(app, 'test-cdktf-cloudflare-worker');
app.synth();
