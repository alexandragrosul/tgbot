//7515589926:AAEML7_4envLSVfEWEPY2irJgE7PwBYfMKI
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const axios = require("axios");

const bot = new Telegraf("7515589926:AAEML7_4envLSVfEWEPY2irJgE7PwBYfMKI");
bot.start((ctx) => ctx.reply("Welcome"));
bot.on("message", async (ctx) => {
  if (ctx.message.location) {
    console.log(ctx.message.location);
    const openWeatherMapApiKey = "62951de7d16d63749469b1ee7826bc4f";
    const weatherServiceUrl = "http://api.openweathermap.org/data/2.5/weather";
    const url = `${weatherServiceUrl}?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${openWeatherMapApiKey}&units=metric`;
    const response = await axios.get(url);
    console.log(response);
    ctx.reply(
      `${response.data.sys.country}
       Location: ${response.data.name}
       Temperature: ${response.data.main.temp}C 
       Humidity: ${response.data.main.humidity}% 
       Wind Speed: ${response.data.wind.speed}m/s `
    );
  }
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
