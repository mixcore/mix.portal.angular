const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,scss}'),
    ...createGlobPatternsForDependencies(__dirname),
    'libs/mix-share/**/!(*.stories|*.spec).{ts,html,scss}',
    'libs/mix-ui/**/!(*.stories|*.spec).{ts,html,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
      },
    },
  },
  plugins: [],
};
