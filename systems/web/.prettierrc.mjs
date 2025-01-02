import busyboxPrettierConfig from '@busybox/prettier-config';

export default Object.assign(busyboxPrettierConfig, {
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  plugins: ['prettier-plugin-astro'],
});
