const discordjs = require("discord.js"),
  bot = new discordjs.Client();
bot.login("");
var usuario;
var pergunta;
var resposta;
bot.on("ready", () => {
  console.log("oi");
})
bot.on("message", async (msg) => {
  if (msg.channel.type === "dm" && msg.author.id !== bot.user.id) {
    if (!usuario) return;
    if (msg.author.id === usuario.id) {
      user.send("Qual a pergunta?");
      pergunta = msg.content;
      usuario.send("Qual a resposta?")
      const msgs = await msg.channel.awaitMessages(msg => {
      }, {time: 5000})
      resposta = msgs.first();
      console.log(`penis: ${pergunta} coiso: ${resposta}`)
    }
  }
  if (msg.content === "!ensinar") {
    msg.channel.send("Clicou ali e ja era").then(msg => {
      msg.react("✅");
    })
  }
})
bot.on('messageReactionAdd', (reaction, user) => {
  if (reaction.emoji.name === "✅" && user.id !== bot.user.id) {
    reaction.remove(user)
    usuario = user;
  }
})
