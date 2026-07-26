import type { APIRoute } from "astro";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/image";

export const GET: APIRoute = async () => {

  const reviews = await client.fetch(`
    *[_type == "restaurantReview"]{

      title,

      rating,

      "slug": slug.current,

      heroImage,

      venue->{

        name,

        city,

        province,

        cuisine,

        featured,

        googleMaps,

        location

      }

    }
  `);

  const results = reviews
    .filter((review: any) => review.venue?.location)
    .map((review: any) => ({

      title: review.title,

      slug: review.slug,

      rating: review.rating,

      heroImage: review.heroImage
        ? urlFor(review.heroImage).width(600).url()
        : null,

      venue: review.venue,

    }));

  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
    },
  });

};