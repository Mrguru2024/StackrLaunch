import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Blog', value: 'blog' },
          { title: 'Features', value: 'features' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'About', value: 'about' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'openGraph',
      title: 'Open Graph',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'object',
      fields: [
        defineField({
          name: 'card',
          title: 'Card Type',
          type: 'string',
          options: {
            list: [
              { title: 'Summary', value: 'summary' },
              { title: 'Summary Large Image', value: 'summary_large_image' },
            ],
          },
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'creator',
          title: 'Creator',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'jsonLd',
      title: 'JSON-LD',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Organization', value: 'Organization' },
              { title: 'WebSite', value: 'WebSite' },
              { title: 'WebPage', value: 'WebPage' },
              { title: 'BlogPosting', value: 'BlogPosting' },
              { title: 'Product', value: 'Product' },
              { title: 'Service', value: 'Service' },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'datePublished',
          title: 'Date Published',
          type: 'datetime',
        }),
        defineField({
          name: 'dateModified',
          title: 'Date Modified',
          type: 'datetime',
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{ type: 'author' }],
        }),
        defineField({
          name: 'publisher',
          title: 'Publisher',
          type: 'reference',
          to: [{ type: 'author' }],
        }),
        defineField({
          name: 'customProperties',
          title: 'Custom Properties',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'key',
                  title: 'Key',
                  type: 'string',
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      page: 'page',
    },
    prepare({ title, page }) {
      return {
        title: `${title} (${page})`,
      };
    },
  },
});
