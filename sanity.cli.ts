// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'cuc9b4kj',    // ← your project id
    dataset: 'production',    // ← your dataset
  },
});
