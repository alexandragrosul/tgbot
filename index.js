const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const parse = async () => {
  const getHtml = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  };

  const searchLibrarius = `https://librarius.md/ro/esearch?search=`;
  const searchElefant = "https://www.elefant.md/search?SearchTerm=";
  const searchCarturesti = "https://carturesti.md/product/search/";

  const searchBooksUrl = `Harry Potter and the Prisoner of Azkaban`
    .split(" ")
    .join("%20");

  const searchSites = [
    {
      url: searchLibrarius,
      selector: "div.anyproduct-card",
      selectorTitle: ".card-title",
      selectorPrice: ".card-price",
      type: "ssr",
    },
    {
      url: searchElefant,
      selector: "div.js-product-tile",
      selectorTitle: ".product-title",
      selectorPrice: ".current-price",
      type: "csr",
    },
    {
      url: searchCarturesti,
      selector: "div.cartu-grid-tile",
      selectorTitle: ".md-title",
      selectorPrice: ".productPrice",
      type: "csr",
    },
  ];

  searchSites.forEach(async (element) => {
    const searchUrl = `${element.url}${searchBooksUrl}`;
    // if (true) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(searchUrl);
    await page.waitForSelector(element.selector);
    const html = await page.content();
    const $ = cheerio.load(html);
    // } else {
    //   const $ = await getHtml(searchUrl);
    // }
    const searchResult = $(element.selector).first();

    console.log(`Site: ${element.url}`);
    console.log(
      `Title: ${searchResult.find(element.selectorTitle).text().trim()}`
    );
    console.log(
      `Price: ${searchResult.find(element.selectorPrice).text().trim()}`
    );
    console.log("-----------------------------");
    2;
  });
};

parse();
