import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Error', value: 'error' },
        ],
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon name (e.g., "info", "warning", "check", "x")',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      content: 'content',
    },
    prepare({ type, content }) {
      const firstBlock = content?.[0]?.children?.[0]?.text || 'Callout';
      return {
        title: firstBlock,
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} Callout`,
      };
    },
  },
});
