import { FC } from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'WebPage';
  data: Record<string, any>;
}

export const StructuredData: FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const OrganizationStructuredData = () => (
  <StructuredData
    type="Organization"
    data={{
      name: 'StackrLaunch',
      url: 'https://stackrlaunch.com',
      logo: 'https://stackrlaunch.com/logo.png',
      sameAs: [
        'https://twitter.com/stackrlaunch',
        'https://github.com/stackrlaunch',
        'https://linkedin.com/company/stackrlaunch',
      ],
      description: 'Next generation Web3 development platform',
    }}
  />
);

export const WebsiteStructuredData = () => (
  <StructuredData
    type="WebSite"
    data={{
      name: 'StackrLaunch',
      url: 'https://stackrlaunch.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://stackrlaunch.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }}
  />
);

export const WaitlistPageStructuredData = () => (
  <StructuredData
    type="WebPage"
    data={{
      name: 'Join StackrLaunch Waitlist',
      description: 'Be among the first to experience the next generation of Web3 development tools',
      url: 'https://stackrlaunch.com/waitlist',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://stackrlaunch.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Waitlist',
            item: 'https://stackrlaunch.com/waitlist',
          },
        ],
      },
    }}
  />
);
