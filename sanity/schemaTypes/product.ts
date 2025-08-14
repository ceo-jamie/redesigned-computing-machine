import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'price', type: 'number', validation: r => r.required().positive() }),
    defineField({ name: 'sku', type: 'string' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'active', type: 'boolean', initialValue: true }),
  ],
});
