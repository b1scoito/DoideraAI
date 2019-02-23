// Arrays

var langsinterativo = ["af Afrikaans", "al Shqip", "ar العربية", "as অসমীয়া", "az Azərbaycanca", "be Беларуская", "bg Български", "bn বাংলা", "br Brezhoneg", "bs Bosanski", "ca Català", "ch 中文(繁體)", "cs Čeština", "cx Cebuano", "cy Cymraeg", "da Dansk", "de Deutsch", "el Ελληνικά", "en English", "es Español", "et Eesti", "eu Euskara", "fa فارسی", "fi Suomi", "fr Français", "fy Frysk", "gl Galego", "gn Avañe'ẽ", "gu ગુજરાતી", "he עברית", "hi हिन्दी", "hr Hrvatski", "hu Magyar", "hy Հայերեն", "id Bahasa Indonesia", "is Íslenska", "it Italiano", "ja 日本語", "jv Basa Jawa", "ka ქართული", "kh ខ្មែរ", "kk Қазақ тілі", "kn ಕನ್ನಡ", "ko 한국어", "ku Kurdî (Kurmancî)", "lt Lietuvių", "lv Latviešu", "mk Македонски", "ml മലയാളം", "mn Монгол", "mr मराठी", "ms Bahasa Melayu", "my ဗမာစာ", "nb Norsk (Bokmål)", "ne नेपाली", "nl Nederlands", "or ଓଡ଼ିଆ", "pa ਪੰਜਾਬੀ", "ph Filipino", "pl Język polski", "ps پښتو", "pt Português", "ro Română", "rs Српски", "ru Русский<", "rw Ikinyarwanda", "si සිංහල", "sk Slovenčina", "sl Slovenščina", "sv Svenska", "sw Kiswahili", "ta தமிழ்", "te తెలుగు", "tg Тоҷикӣ", "th ไทย", "tr Türkçe", "uk Українська", "ur اردو", "uz O'zbek", "vn Tiếng Việt", "zh 中文(简体)"];
var langs = ["af", "al", "ar", "as", "az", "be", "bg", "bn", "br", "bs", "ca", "ch", "cs", "cx", "cy", "da", "de", "el", "en", "es", "et", "eu", "fa", "fi", "fr", "fy", "gl", "gn", "gu", "he", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "jv", "ka", "kh", "kk", "kn", "ko", "ku", "lt", "lv", "mk", "ml", "mn", "mr", "ms", "my", "nb", "ne", "nl", "or", "pa", "ph", "pl", "ps", "pt", "ro", "rs", "ru", "rw", "si", "sk", "sl", "sv", "sw", "ta", "te", "tg", "th", "tr", "uk", "ur", "uz", "vn", "zh"];

// Imports

const config = require("./config.json");
const tokensc = require("./tokens.json")
const axios = require("axios");
const colors = require('colors');
const fs = require('fs');
const discordjs = require("discord.js"),
    bot = new discordjs.Client();

// Funcs

function AddZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function ValidURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(url);
}

function ValidTOKEN(token) {
    var p = new RegExp('^([0-9a-z]{8})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{12})$')
    return p.test(token)
}

function IsInArray(value, array) {
    return array.indexOf(value) > -1;
}

function embedC00L(title, desc, color) {
    var embed = new discordjs.RichEmbed().setTimestamp().setTitle(title).setDescription(desc).setColor(color)
    return embed;
}

// Defs

var dateObj = new Date();
var hours = AddZero(dateObj.getHours());
var minutes = AddZero(dateObj.getMinutes());
var seconds = AddZero(dateObj.getSeconds());
var time = hours + ":" + minutes + ":" + seconds;
var templangarr = "";
var ultimolog = "Nada";
var valoragrr = 1.0;
var langapi = "pt";
var pergunta;
var resposta;
var usuario;
let valorfaltandotoken = 100;
let valortoken = 0;
let valordiario = parseInt(tokensc.tokens.length) * 100;

// Login

bot.login(config.token);

// Ready Func

bot.on("ready", () => {
    console.log(`DoideraAI Online!\nMensagens diarias: ${valordiario}`.green);
    bot.user.setPresence({
        game: {
            name: 'suas mensagens, DoideraAI',
            type: "WATCHING"
        }
    });
});

// Err Handling

bot.on('error', err => {
    console.log("Erro! ".red + err)
});

// Msg
bot.on('message', msg => {
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (msg.author.id !== bot.user.id && msg.content.startsWith(config.prefix)) {
        switch (command) {
            case 'addporno':
                if (msg.channel.nsfw) {
                    fs.readFile('pornos.json', (err, data) => {
                        if (err) throw err;
                        let pornos = JSON.parse(data);
                        if (msg.attachments.size > 0) {
                            function extension(attachment) {
                                const imageLink = attachment.split('.');
                                const typeOfImage = imageLink[imageLink.length - 1];
                                const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
                                if (!image) return '';
                                return attachment;
                            }
                            const imagem = msg.attachments.size > 0 ? extension(msg.attachments.array()[0].url) : '';
                            if (!ValidURL(imagem)) {
                                msg.channel.send(embedC00L("Porno", "URL Inválida!", "0xFFFFFF"))
                                return;
                            }
                            if (IsInArray(imagem, pornos.pornos)) {
                                msg.channel.send(embedC00L("Porno", "Porno já existente na database!", "0xFFFFFF"))
                                return;
                            }
                            pornos.pornos.push(imagem)
                            let pornosupar = JSON.stringify(pornos);
                            fs.writeFileSync('pornos.json', pornosupar);
                            msg.channel.send(embedC00L("Porno", "Porno adicionado com sucesso!", "0xFFFFFF"));
                            console.log("Porno adicionado: ".green + imagem)
                        } else {
                            if (!args[0]) {
                                msg.channel.send(embedC00L("Porno", "Use: !addporno FOTO ou LINK", "0xFFFFFF"))
                                return;
                            }
                            if (!ValidURL(args[0])) {
                                msg.channel.send(embedC00L("Porno", "URL Inválida!", "0xFFFFFF"))
                                return;
                            }
                            if (IsInArray(args[0], pornos.pornos)) {
                                msg.channel.send(embedC00L("Porno", "Porno já existente na database!", "0xFFFFFF"))
                                return;
                            }

                            var extension = args[0].split('.').pop().toLowerCase();
                            if (extension !== "jpg" && extension !== "png" && extension !== "jpeg" && extension !== "gif") {
                                msg.channel.send(embedC00L("Porno", "Você só pode adicionar estas extensões: jpg, png, jpeg, gif!", "0xFFFFFF"))
                                return;
                            }
                            pornos.pornos.push(args[0])
                            let pornosupar = JSON.stringify(pornos);
                            fs.writeFileSync('pornos.json', pornosupar);
                            msg.channel.send(embedC00L("Porno", "Porno adicionado com sucesso!", "0xFFFFFF"));
                            console.log("Porno adicionado: ".green + args[0])
                        }
                    })
                } else {
                    msg.channel.send(embedC00L("Epa Epa!", `<@${msg.author.id}> So no canal de porno rapaz!`, "0xFFFFFF"))
                    msg.delete();
                }
                break;
        }
        switch (command) {
            case 'stats':
                msg.channel.send(embedC00L("Log", ultimolog, "0xFFFFFF"));
                break;
            case 'addmeme':
                fs.readFile('memes.json', (err, data) => {
                    if (err) throw err;
                    let memes = JSON.parse(data);
                    if (msg.attachments.size > 0) {
                        function extension(attachment) {
                            const imageLink = attachment.split('.');
                            const typeOfImage = imageLink[imageLink.length - 1];
                            const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
                            if (!image) return '';
                            return attachment;
                        }
                        const imagem = msg.attachments.size > 0 ? extension(msg.attachments.array()[0].url) : '';
                        if (!ValidURL(imagem)) {
                            msg.channel.send(embedC00L("Memes", "URL Inválida!", "0xFFFFFF"))
                            return;
                        }
                        if (IsInArray(imagem, memes.memes)) {
                            msg.channel.send(embedC00L("Memes", "Meme já existente na database!", "0xFFFFFF"))
                            return;
                        }
                        memes.memes.push(imagem)
                        let memesupar = JSON.stringify(memes);
                        fs.writeFileSync('memes.json', memesupar);
                        msg.channel.send(embedC00L("Memes", "Meme adicionado com sucesso!", "0xFFFFFF"));
                        console.log("Meme adicionado: ".green + imagem)
                    } else {
                        if (!args[0]) {
                            msg.channel.send(embedC00L("Memes", "Use: !addmeme FOTO ou LINK", "0xFFFFFF"))
                            return;
                        }
                        if (!ValidURL(args[0])) {
                            msg.channel.send(embedC00L("Memes", "URL Inválida!", "0xFFFFFF"))
                            return;
                        }
                        if (IsInArray(args[0], memes.memes)) {
                            msg.channel.send(embedC00L("Memes", "Meme já existente na database!", "0xFFFFFF"))
                            return;
                        }

                        var extension = args[0].split('.').pop().toLowerCase();
                        if (extension !== "jpg" && extension !== "png" && extension !== "jpeg" && extension !== "gif") {
                            msg.channel.send(embedC00L("Memes", "Você só pode adicionar estas extensões: jpg, png, jpeg, gif!", "0xFFFFFF"))
                            return;
                        }
                        memes.memes.push(args[0])
                        let memesupar = JSON.stringify(memes);
                        fs.writeFileSync('memes.json', memesupar);
                        msg.channel.send(embedC00L("Memes", "Meme adicionado com sucesso!", "0xFFFFFF"));
                        console.log("Meme adicionado: ".green + args[0])
                    }
                })
                break;
            case 'limpartokens':
                if (msg.author.id !== config.iddono) {
                    msg.channel.send(embedC00L("Permissão", "Você não tem permissão para efetuar este comando! Permissão solicitada: `biscoito`", "0xFFFFFF"));
                } else {
                    fs.readFile('tokens.json', (err, data) => {
                        if (err) throw err;
                        let limpartokens = JSON.parse(data);
                        limpartokens.tokens = [];
                        let upardata = JSON.stringify(limpartokens);
                        fs.writeFileSync('tokens.json', upardata);
                        msg.channel.send(embedC00L("Tokens", "Database limpa!", "0xFFFFFF"));
                        console.log(`Database de Tokens limpa! ${time}`.red)
                    })
                }
                break;
            case 'addtoken':
                if (msg.member.roles.find(x => x.name === "admin")) {
                    fs.readFile('tokens.json', (err, data) => {
                        if (err) throw err;
                        let tokens = JSON.parse(data);
                        if (!args[0]) {
                            msg.channel.send(embedC00L("Tokens", "Use: !addtoken TOKEN", "0xFFFFFF"));
                            return;
                        }
                        if (!ValidTOKEN(args[0])) {
                            msg.channel.send(embedC00L("Tokens", "Formato invalido!", "0xFFFFFF"))
                        }
                        if (IsInArray(args[0], tokens.tokens)) {
                            msg.channel.send(embedC00L("Tokens", "Token já existente na database!", "0xFFFFFF"))
                            return;
                        }
                        tokens.tokens.push(args[0])
                        let upardata = JSON.stringify(tokens);
                        fs.writeFileSync('tokens.json', upardata);
                        msg.channel.send(embedC00L("Tokens", "Token adicionado!", "0xFFFFFF"));
                        console.log(`Token adicionado: ${args[0]}`.green)
                    })
                } else {
                    msg.channel.send(embedC00L("Permissão", "Você não tem permissão para efetuar este comando! Permissão solicitada: `Admin`", "0xFFFFFF"));
                }
                break;
            case 'agressividade':
                if (msg.member.roles.find(x => x.name === "admin")) {
                    if (!args[0]) {
                        msg.channel.send(embedC00L("Agressividade", "Use: !agressividade VALOR (0.0m => 1.0h)", "0xFFFFFF"));
                        return;
                    }
                    valoragrr = args[0];
                    msg.channel.send(embedC00L("Agressividade", "Valor alterado!", "0xFFFFFF"));
                }
                break;
            case 'falar':
                msg.delete();
                msg.channel.send(args.join(" "))
                break;
            case 'ajuda':
                msg.channel.send(embedC00L("Ajuda", `${msg.guild.channels.get('539905955928997889').toString()}`, "0xFFFFFF"));
                break;
            case 'trocarlang':
                if (msg.member.roles.find(x => x.name === "admin")) {
                    if (!args[0]) {
                        msg.channel.send(embedC00L("Langs", "Use: !trocarlang VALOR (!langs)", "0xFFFFFF"));
                        return
                    }
                    for (var i = 0; i < langs.length; i++) {
                        templangarr = templangarr + " " + langs[i];
                    }
                    if (!templangarr.includes(args[0])) {
                        msg.channel.send(embedC00L("Langs", "Linguagem Incorreta!", "0xFFFFFF"));
                        return;
                    }
                    langapi = args[0].toLowerCase();
                    msg.channel.send(embedC00L("Langs", `Linguagem Atualizada: ${args[0].toUpperCase()}`, "0xFFFFFF"));
                } else {
                    msg.channel.send(embedC00L("Permissão", "Você não tem permissão para efetuar este comando! Permissão solicitada: `Admin`", "0xFFFFFF"));
                }
                break;
            case 'langs':
                var templiarr = "";
                for (var i = 0; i < langsinterativo.length; i++) {
                    templiarr = templiarr + "\n" + langsinterativo[i];
                }
                msg.channel.send(embedC00L("Langs", templiarr, "0xFFFFFF"));
                break;
        }
    }
    if (msg.author.id !== bot.user.id && msg.channel.id === config.canalnsfw) {
        if (msg.channel.nsfw) {
            switch (msg.content.toLowerCase()) {
                case 'dropa um porno ai':
                    fs.readFile('pornos.json', (err, data) => {
                        if (err) throw err;
                        let porns = JSON.parse(data);
                        var pornrand = Math.floor(Math.random() * porns.pornos.length);
                        var pornembed = new discordjs.RichEmbed().setTimestamp().setImage(porns.pornos[pornrand]).setColor('0xFFFFFF')
                        msg.channel.send(pornembed);
                    })
                    break;
            }
        }
    }
    if (msg.author.id !== bot.user.id && msg.channel.id === config.canaldoidera && !msg.content.startsWith("!")) {
        if (!msg.member.roles.find(x => x.name === "Contribuidor | Contributor")) {
            let role = msg.guild.roles.find(r => r.name === "Contribuidor | Contributor");
            msg.member.addRole(role);
        }
        switch (msg.content.toLowerCase()) {
            case 'eu tenho uma web namorada':
                msg.channel.send("Gado D+");
                return;
            case 'se mata ai doidera':
                if (msg.author.id !== config.iddono) {
                    msg.channel.send("paraaa por favor eu de emploro!")
                    return;
                }
                msg.channel.send("foi bom conhecer vcs txau :cry:")
                setTimeout(() => {
                    process.exit(0);
                }, 1000)
                break;
            case 'doidera':
                msg.channel.send("o bot mais doido do mundo!!")
                return;
            case 'idetect':
                msg.channel.send("Aquela ss tool fodona entra no nosso discord: https://discord.gg/GArP2z")
                return;
            case 'code66':
                msg.channel.send("uma das primeiras")
                return;
            case 'niibler':
                msg.channel.send("GOSTOSÃOOOOOOOOOOO");
                return;
            case 'paladin':
                msg.channel.send("sstool invejosa pepegao")
                return;
            case 'qual e minha foto':
                msg.channel.send("toma ai seu porra")
                let pessoa = msg.mentions.users.first() || bot.users.get(args[0]) || msg.author;
                let avatar = pessoa.displayAvatarURL
                if (avatar.endsWith(".gif")) {
                    avatar = `${pessoa.displayAvatarURL}?size=2048`
                }
                msg.channel.send({
                    embed: {
                        title: `${pessoa.tag}`,
                        description: `[diretao lol](${avatar})`,
                        image: {
                            url: `${avatar}`
                        },
                        color: 0xFFFFFF
                    }
                })
                return;

            case 'dropa um meme ai':
                fs.readFile('memes.json', (err, data) => {
                    if (err) throw err;
                    let menes = JSON.parse(data);
                    var memerandom = Math.floor(Math.random() * menes.memes.length);
                    var memeEmbed = new discordjs.RichEmbed()
                        .setTimestamp()
                        .setImage(menes.memes[memerandom])
                        .setColor('0xFFFFFF')
                    msg.channel.send(memeEmbed);
                })
                return;
            case 'quem te criou?':
                msg.channel.send("O biscoito é claro ne fdp")
                return;
            case '$elf':
                msg.channel.send("burro q n quer ganhar dinheiro e quer uma placa de video")
                return;
            case 'vympel':
                msg.channel.send("é do exército mais dá daface")
                return;
            case 'inocent':
                msg.channel.send("quantas star tu tem no zone mesmo random?")
                return;
            case 'swalla':
                msg.channel.send("random dms esses cara")
                return;
            case 'krawk':
                msg.channel.send("qnd vcs fize dinheiro com deface fala cmg")
                return;
            case 'biscoito':
                msg.channel.send("fez eu")
                return;
            case 'ponei':
                msg.channel.send("ultra programador mega blaster designer!!!")
                return;
        }
        if (msg.content.startsWith("#")) {
            msg.react("👀");
            return;
        }
        fs.readFile('tokens.json', (err, data) => {
            if (err) throw err;
            let intel = JSON.parse(data);
            axios.get('http://sandbox.api.simsimi.com/request.p?key=' + intel.tokens[valortoken] + '&lc=' + langapi + '&ft=' + valoragrr + '&text=' + msg.content).then(response => {
                ultimolog = "Request token: " + intel.tokens[valortoken] + " Tokens: " + intel.tokens.length + " Autor: " + msg.author.username + " Valor Rodada: " + valortoken + " Quanto falta pra o token acabar: " + valorfaltandotoken;
                console.log("Request token: ".green + intel.tokens[valortoken] + " Tokens: ".red + intel.tokens.length + " Autor: " + msg.author.username + " Valor Rodada: ".green + valortoken + " Quanto falta pra o token acabar: ".green + valorfaltandotoken)
                if (response.data['result'] === 100) {
                    valorfaltandotoken--;
                    msg.channel.startTyping();
                    setTimeout(function () {
                        msg.channel.send(response.data['response'].replace("simsimi", "doidera"));
                        msg.channel.stopTyping(true);
                    }, Math.floor(Math.random() * 1200) + 350);
                } else if (response.data['result'] === 509) {
                    if (typeof intel.tokens[valortoken] === 'undefined') {
                        msg.channel.send(embedC00L("AI", "Todos TOKENS acabaram!\nUtilize !addtoken TOKEN para adicionar mais tokens! (Só para admins, algumas mensagens disponiveis sem API)", "0xFFFFFF"));
                        return;
                    } else {
                        valorfaltandotoken = 100;
                        valortoken += 1;
                    }
                    console.log("Limite excedido: ".red + intel.tokens[valortoken] + " Descartando token e rodando pra um funcional.")
                    msg.channel.send(embedC00L("AI", `Limite excedido: ${intel.tokens[valortoken]} Descartando token e rodando pra um funcional. (Automaticamente)`, "0xFFFFFF"));
                } else if (response.data['result'] === 404) {
                    pergunta = msg.content;
                    msg.channel.send(embedC00L("Aprendizagem", "Mensagem nao encontrada. Se voce quer me ensinar, clique no 💡", "0xFFFFFF")).then(msg => {
                        msg.react("💡");
                    });
                } else if (response.data['result'] === 401) {
                    msg.channel.send(embedC00L("Error", `Unauthorized. Flooda o biscoito sobre o erro!! <@${config.iddono}>`, "0xFFFFFF"));
                } else if (response.data['result'] === 400) {
                    msg.channel.send(embedC00L("Error", `Bad Request. Flooda o biscoito sobre o erro!! <@${config.iddono}>`, "0xFFFFFF"));
                } else if (response.data['result'] === 500) {
                    msg.channel.send(embedC00L("Error", `Server Error. Flooda o biscoito sobre o erro!! <@${config.iddono}>`, "0xFFFFFF"));
                } else {
                    msg.channel.send(embedC00L("Error", `Unknown Error. Flooda o biscoito sobre o erro!!  <@${config.iddono}>`, "0xFFFFFF"));
                }
            }).catch(error => {
                console.log("Erro na API: ".red + error)
            });
        })

    }
    /*
    bot.on('messageReactionAdd', (reaction, user) => {
        if (user.id === bot.user.id) return;

        function once(fn, context) {
            var result;
            return function () {
                if (fn) {
                    result = fn.apply(context || this, arguments);
                    fn = null;
                }
                return result;
            };
        }
        var canOnlyFireOnce = once(function() {
            console.log(user.username);
        });
        canOnlyFireOnce();
        var something = (function () {
            var executed = false;
            return function () {
                if (!executed) {
                    executed = true;
                    console.log(user.username);
                    //setTimeout(() => {doneTheStuff = false}, 1000);
                }
            };
        })();
        something();
        if (reaction.emoji.name === "💡" && user.id !== bot.user.id) {
            reaction.remove(user)
            user.send(embedC00L("Aprendizagem", `Oque o Doidera deveria responder quando voce falar: ${pergunta}`, "0xFFFFFF"))
            user = usuario;
            if (msg.channel.type === "dm" && msg.author.id !== bot.user.id) {
                if (!user) return;
                if (msg.author.id === user.id) {
                    resposta = msg.content;
                    console.log(`penis: ${pergunta} coiso: ${resposta}`)
                }
            }
        }
    })
    */
});