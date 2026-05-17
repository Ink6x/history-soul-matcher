import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: [
        'src/lib/scoring.ts',
        'src/lib/impression-similarity.ts',
        'src/types/feature-similarity.ts',
        'src/types/features.ts',
        'src/types/analysis.ts',
      ],
      exclude: [
        'src/content/**',
        '**/*.test.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
