import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
