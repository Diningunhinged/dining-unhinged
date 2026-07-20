import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
  schema: z.object({
    title: z.string(),
    restaurant: z.string(),
    city: z.string(),
    province: z.string(),

    rating: z.number(),

    featured: z.boolean().default(false),

    date: z.coerce.date(),

    heroImage: z.string(),

    googleReview: z.string().optional(),

    restaurantWebsite: z.string().optional(),

    cuisine: z.string(),

    cocktails: z.boolean().default(false),
  }),
});

export const collections = {
  reviews,
};