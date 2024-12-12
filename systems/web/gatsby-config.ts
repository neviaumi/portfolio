import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfoilo`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['GTM-P59N7RNS'],
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `TinaCMS`,
        fieldName: `tinacms`,
        url: `http://localhost:4001/graphql`,
      },
    },
  ],
};

export default config;
