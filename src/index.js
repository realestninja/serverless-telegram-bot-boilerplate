export default {
	async fetch(request, env, ctx) {
    if (request.method === "POST") {
      const payload = await request.json()
      if ("message" in payload) {
        const { BOT_TOKEN } = env;
        const chatId = payload.message.chat.id
        const response = `${payload.message.text} to you too`;

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${response}`

        console.log("url:", url);

        const data = await fetch(url).then(resp => resp.json())
        console.log("data:", data);
      }
    }
    return new Response("hello world");
	},
};
