import { useEffect, useState } from "react";

const Sitemap = ({ sitemap }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    await fetch(
      `https://${process.env.NEXT_PUBLIC_DOMAIN}/wp-json/sitemap/v1/sitemap`
    )
      .then((response) => {        
        return response.json();
      })
      .then((data) => {        
        setData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <>{sitemap}</>;
};

export default Sitemap;

export const getServerSideProps = async ({ res }) => {
  const postData = await fetch(
    `https://${process.env.NEXT_PUBLIC_DOMAIN}/wp-json/sitemap/v1/sitemap`
  );
  const articlesData = await postData.json();

  function formatDateArray(articlesData) {
    for (let i = 0; i < articlesData.length; i++) {
      const date = new Date(articlesData[i].modified_date);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
    //const formattedDate = date.toLocaleDateString("en-US", options);
      const formattedDate =  date.toISOString().split('T')[0];
      articlesData[i].modified_date = formattedDate;
    }
  }
  formatDateArray(articlesData);

  const urls = [];

  //   Generate the URLs based on the fetched data
  articlesData.forEach((article) => {
    const url = {
      loc: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}${article.url}`, // The dynamic URL
      //   changefreq: "daily",
      //   priority: 0.7,
      lstMod: article.modified_date,
    };
    urls.push(url);
  });

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${urls
        .map((url) => {
          return `
            <url>
              <loc>${url.loc}</loc>
              <lastmod>${url.lstMod}</lastmod>
            </url>
          `;
        })
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "application/xml");

  res.write(sitemapXML);

  res.end();

  return {
    props: {
      sitemapXML,
    },
  };
};
