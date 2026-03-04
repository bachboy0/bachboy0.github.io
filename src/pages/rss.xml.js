import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      const lang = post.data.lang ?? "en";
      const slug = post.id.replace(new RegExp(`\\.?${lang}$`), "");
      return {
        ...post.data,
        link: `/${lang}/blog/${slug}/`,
      };
    }),
  });
}
