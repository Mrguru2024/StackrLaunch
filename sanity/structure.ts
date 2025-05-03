import type { StructureBuilder } from 'sanity/desk';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentList()
            .title('Blog Posts')
            .filter('_type == "post"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Authors')
        .child(S.documentList().title('Authors').filter('_type == "author"')),
    ]);
