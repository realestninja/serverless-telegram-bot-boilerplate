export default {
  async fetch(request, env, ctx) {
    const gatherResponse = async (response) => await response.json();

    const sendMessageToTelegramUser = async ({ token, chatId, text }) => {
      const telegramSendToUserUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`
      const telegramResponse = await fetch(telegramSendToUserUrl);
      const responseData = await gatherResponse(telegramResponse);
      console.log(JSON.stringify(responseData, null, 4));
    };

    if (request.method === "POST") {
      const payload = await request.json()
      if ("message" in payload) {
        const { BOT_TOKEN } = env;
        const chatId = payload.message.chat.id
        const text = `${payload.message.text} to you too`;
        await sendMessageToTelegramUser({ token: BOT_TOKEN, chatId, text });
      }
    }
    return new Response("hello world");
  },
};
