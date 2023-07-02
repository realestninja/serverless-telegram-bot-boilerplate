import { sendMessageToTelegramUser } from "./telegram";

export default {
  async fetch(request, env, ctx) {
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
