import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './sanity/env';

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
});
