import { sanity } from './sanity';

interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: {
      asset: {
        url: string;
      };
    };
    url?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: {
      asset: {
        url: string;
      };
    };
    creator?: string;
  };
  jsonLd?: {
    type: string;
    name?: string;
    description?: string;
    url?: string;
    image?: {
      asset: {
        url: string;
      };
    };
    datePublished?: string;
    dateModified?: string;
    author?: {
      name: string;
      image?: {
        asset: {
          url: string;
        };
      };
    };
    publisher?: {
      name: string;
      image?: {
        asset: {
          url: string;
        };
      };
    };
    customProperties?: Array<{
      key: string;
      value: string;
    }>;
  };
}

export async function getMetadata(page: string): Promise<Metadata | null> {
  try {
    const metadata = await sanity.fetch<Metadata>(
      `*[_type == "metadata" && page == $page][0] {
        title,
        description,
        keywords,
        openGraph {
          title,
          description,
          image {
            asset-> {
              url
            }
          },
          url
        },
        twitter {
          card,
          title,
          description,
          image {
            asset-> {
              url
            }
          },
          creator
        },
        jsonLd {
          type,
          name,
          description,
          url,
          image {
            asset-> {
              url
            }
          },
          datePublished,
          dateModified,
          author-> {
            name,
            image {
              asset-> {
                url
              }
            }
          },
          publisher-> {
            name,
            image {
              asset-> {
                url
              }
            }
          },
          customProperties
        }
      }`,
      { page }
    );

    return metadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
}

export function generateJsonLd(metadata: Metadata): string {
  if (!metadata.jsonLd) return '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': metadata.jsonLd.type,
    ...(metadata.jsonLd.name && { name: metadata.jsonLd.name }),
    ...(metadata.jsonLd.description && { description: metadata.jsonLd.description }),
    ...(metadata.jsonLd.url && { url: metadata.jsonLd.url }),
    ...(metadata.jsonLd.image && { image: metadata.jsonLd.image.asset.url }),
    ...(metadata.jsonLd.datePublished && { datePublished: metadata.jsonLd.datePublished }),
    ...(metadata.jsonLd.dateModified && { dateModified: metadata.jsonLd.dateModified }),
    ...(metadata.jsonLd.author && {
      author: {
        '@type': 'Person',
        name: metadata.jsonLd.author.name,
        ...(metadata.jsonLd.author.image && {
          image: metadata.jsonLd.author.image.asset.url,
        }),
      },
    }),
    ...(metadata.jsonLd.publisher && {
      publisher: {
        '@type': 'Organization',
        name: metadata.jsonLd.publisher.name,
        ...(metadata.jsonLd.publisher.image && {
          logo: {
            '@type': 'ImageObject',
            url: metadata.jsonLd.publisher.image.asset.url,
          },
        }),
      },
    }),
    ...(metadata.jsonLd.customProperties && {
      ...metadata.jsonLd.customProperties.reduce(
        (acc, { key, value }) => ({
          ...acc,
          [key]: value,
        }),
        {}
      ),
    }),
  };

  return JSON.stringify(jsonLd);
}
