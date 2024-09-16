// const axios = require("axios");
// const cheerio = require("cheerio");
// const TelegramBot = require("node-telegram-bot-api");

// // Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
// const bot = new TelegramBot("7383168427:AAH1cPupdXtP3G3HyMv6-T4K4wZyGWcQibw", {
//   polling: true,
// });

// const parseBookInfo = async (query) => {
//   const getHtml = async (url) => {
//     const { data } = await axios.get(url);
//     return cheerio.load(data);
//   };

//   const searchLibrarius = `https://librarius.md/ro/esearch`;
//   const searchBooksUrl = query.split(" ").join("+");
//   const searchUrl = `${searchLibrarius}?search=${searchBooksUrl}`;
//   const $ = await getHtml(searchUrl);

//   const searchResult = $("div.anyproduct-card").first();
//   const title = searchResult.find(".card-title").text().trim();
//   const price = searchResult.find(".card-price").text().trim();

//   return { title, price };
// };

// // Обработка текстовых сообщений
// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const query = msg.text;

//   if (!query) {
//     bot.sendMessage(chatId, "Пожалуйста, отправьте название книги для поиска.");
//     return;
//   }

//   try {
//     const { title, price } = await parseBookInfo(query);
//     if (title && price) {
//       bot.sendMessage(chatId, `Название: ${title}\nЦена: ${price}`);
//     } else {
//       bot.sendMessage(chatId, "Книга не найдена.");
//     }
//   } catch (error) {
//     bot.sendMessage(chatId, "Произошла ошибка при поиске книги.");
//     console.error(error);
//   }
// });

const parseBookInfo = async (query) => {
  try {
    const getHtml = async (url) => {
      console.log(`Fetching URL: ${url}`);
      const { data } = await axios.get(url);
      return cheerio.load(data);
    };

    const searchLibrarius = `https://librarius.md/ro/esearch`;
    const searchBooksUrl = query.split(" ").join("+");
    const searchUrl = `${searchLibrarius}?search=${searchBooksUrl}`;
    const $ = await getHtml(searchUrl);

    const searchResult = $("div.anyproduct-card").first();
    console.log("Search result:", searchResult.html());

    const title = searchResult.find(".card-title").text().trim();
    const price = searchResult.find(".card-price").text().trim();

    console.log(`Found title: ${title}, price: ${price}`);

    return { title, price };
  } catch (error) {
    console.error("Error in parseBookInfo:", error);
    return {};
  }
};
