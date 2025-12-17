import { defineCollection, z } from 'astro:content';

const menu = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.string().optional(),
        title: z.string(),
        image: z.string(),
        alt: z.string().optional(),
        order: z.number().optional(),
    }),
});

const locations = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        address: z.string(),
        embedUrl: z.string(),
        directionsUrl: z.string().optional(),
        order: z.number().optional(),
    }),
});

export const collections = { menu, locations };
