import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string; // ← novo: caminho da página atual, ex: "/about"
  type?: "website" | "article";
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_vnyvbf.webp";

const SITE_URL = "https://praisefmaustralia.vercel.app";
const TWITTER_HANDLE = "@praisefmaus"; // ajuste se tiver

const SEO = ({
  title,
  description,
  image,
  path = "",
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    const pageUrl = `${SITE_URL}${path}`; // ← URL dinâmica por página
    const resolvedImage = image || DEFAULT_IMAGE;

    document.title = title;

    const setMeta = (key: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${key}"]`
        : `meta[name="${key}"]`;
      let meta = document.querySelector<HTMLMetaElement>(selector);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(isProperty ? "property" : "name", key);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    // — Basic —
    setMeta("description", description);
    setMeta("robots", "index, follow");
    setMeta("author", "Praise FM Australia");

    // — Open Graph —
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", resolvedImage, true);
    setMeta("og:image:width", "1200", true);   // ← novo
    setMeta("og:image:height", "630", true);   // ← novo
    setMeta("og:image:alt", title, true);      // ← novo: acessibilidade
    setMeta("og:type", type, true);            // ← dinâmico
    setMeta("og:site_name", "Praise FM Australia", true);
    setMeta("og:url", pageUrl, true);          // ← agora dinâmico
    setMeta("og:locale", "en_AU", true);

    // — Twitter Card —
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", TWITTER_HANDLE);   // ← novo
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", resolvedImage);
    setMeta("twitter:image:alt", title);       // ← novo

    // — Canonical —
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", pageUrl);        // ← agora dinâmico

    // — Schema.org —
    const scriptId = "schema-org";
    document.getElementById(scriptId)?.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RadioStation",
      name: "Praise FM Australia",
      description,                             // ← novo
      url: SITE_URL,
      logo: {                                  // ← agora ImageObject
        "@type": "ImageObject",
        url: resolvedImage,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.instagram.com/praisefmaustralia/",
        // adicione Facebook, YouTube etc. aqui
      ],
      areaServed: {
        "@type": "Place",
        name: "Australia",
      },
    });

    document.head.appendChild(script);

    // — Cleanup ao desmontar —
    return () => {                             // ← novo: evita vazamento
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, image, path, type]);

  return null;
};

export default SEO;