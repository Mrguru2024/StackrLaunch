import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import author from './author';
import category from './category';
import blockContent from './blockContent';

// Remove duplicate imports and use a single source of truth
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent],
};

export const schemaTypes = [post, author, category, blockContent];
