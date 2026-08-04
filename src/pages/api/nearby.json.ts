import type { APIRoute } from "astro";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/image";
import { calculateOverall } from "../../lib/calculateOverall";

export const GET: APIRoute = async () => {

  const data = await client.fetch(`
  {
    "venues": *[_type == "restaurantReview"]{
      title,
      scores,
      "slug": slug.current,
      heroImage,
      venueType,

      venue->{
        name,
        city,
        province,
        cuisine,
        featured,
        googleMaps,
        location
      }
    },

    "drinks": *[_type == "cocktailReview"]{
      title,
      scores,
      "slug": slug.current,
      drinkType,
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
  }
  `);

  const venueResults = data.venues
    .filter((r: any) => r.venue?.location)
    .map((r: any) => ({

      type: "venue",

      category: r.venueType,

      title: r.title,

      slug: r.slug,

      rating: calculateOverall(r.scores),

      heroImage: r.heroImage
        ? urlFor(r.heroImage).width(700).url()
        : null,

      venue: r.venue

    }));

  const drinkResults = data.drinks
    .filter((r: any) => r.venue?.location)
    .map((r: any) => ({

      type: "drink",

      category: r.drinkType,

      title: r.title,

      slug: r.slug,

      rating: calculateOverall(r.scores),

      heroImage: r.heroImage
        ? urlFor(r.heroImage).width(700).url()
        : null,

      venue: r.venue

    }));

  const results = [

    ...venueResults,

    ...drinkResults

  ];

  return new Response(

    JSON.stringify(results),

    {

      headers: {

        "Content-Type": "application/json"

      }

    }

  );

};