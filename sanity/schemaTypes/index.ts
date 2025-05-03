import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import post from './post';
import author from './author';
import metadata from './metadata';
import category from './category';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, metadata, category],
};

export const schemaTypes = [post, author, metadata, category];
