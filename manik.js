/*
SCRIPT MANIKBOT V8.0
SCRIPT INI REEDIT DARI SCRIPT TOBZ ELAINA
REEDIT BY: ARYA MANIK
*/
require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const translate = require('translatte')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')

const { getStickerMaker } = require('./lib/ttp')
const quotedd = require('./lib/quote')
const color = require('./lib/color')
const urlShortener = require('./lib/shortener')
const { addFilter, isFiltered } = require('./lib/msgFilter')
const cariKasar = require('./lib/kataKotor')

const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    processTime,
    nulis
    } = require('./lib/functions')

const { 
    help,
    admincmd,
    ownercmd,
    nsfwcmd,
    kerangcmd,
    mediacmd,
    animecmd,
    othercmd,
    downloadcmd,
    praycmd,
    groupcmd,
    funcmd,
    bahasalist,
    sewa,
    snk, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const {
    instagram,
    tiktok,
    facebook,
    smule,
    starmaker,
    twitter,
    joox
    } = require('./lib/downloader')

const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    uploadImages, 
    custom,
    picturemis
    } = require('./lib/fetcher')

// LOAD FILE
let banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfwz.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/Simsimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
let adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
let specialNumber = JSON.parse(fs.readFileSync('./lib/database/spesial.json'))

// PROTECT
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/msgBadword.json'))
let dbbadword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/badword.json'))
let pendaftar = JSON.parse(fs.readFileSync('./lib/database/user.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/database/stickerspam.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    melodickey,
    vhtearkey,
    tobzkey,
    restartState: isRestart,
    mtc: mtcState
    } = setting

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

prefix = '#'
var timeStart = Date.now() / 1000
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = manik = async (manik, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const argx = commands.toLowerCase()
        const args =  commands.split(' ')
        const command = commands.toLowerCase().split(' ')[0] || ''

        global.prefix
        
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await manik.getHostNumber()
        const blockNumber = await manik.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await manik.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const SN = GenerateSerialNumber("000000000000000000000000")

        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        const isBadword = badword.includes(chatId)
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const arg = body.substring(body.indexOf(' ') + 1)
        const isKasar = await cariKasar(chats)
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(prefix)
        
        const tms = (Date.now() / 1000) - (timeStart);
        const cts = waktu(tms)

        const serial = sender.id
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '6285737134572@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        const isSpecial = specialNumber.includes(sender.id)

        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isAdmin && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await manik.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    manik.reply(from, `*「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`, id).then(() => {
                        manik.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }
        
        // [BETA] Avoid Spam Message
        //if (isCmd && isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        //if (isCmd && isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // AKTIFKAN APABILA TIDAK INGIN TERKENA SPAM!!
        //addFilter(from)
        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}

        // FUNCTION
        function waktu(seconds) { // manik
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari,":" Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam,":" Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit,":" Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik,":" Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
        var nmr = sender.id
        var obj = pendaftar.some((val) => {
            return val.id === nmr
        })
        var cekage = pendaftar.some((val) => {
            return val.id === nmr && val.umur >= 15
        })

        function monospace(string) {
            return '```' + string + '```'
        }


        function isReg(obj){
            if (obj === true){
                return false
            } else {     
                return manik.reply(from, `╭◪ NOT REGISTER
╰───────────────╮  
╭───────────────╯
├❏ *KAMU BELOM DAFTAR JADI USER MANIK BOT*
├❏ *UNTUK MENDAFTAR KIRIM*
├❏ *${prefix}daftar |nama|umur*
├❏ *CONTOH:*
├❏ *${prefix}daftar |manik|16*
├❏ *Jangan Lupa Donasi Agar Bot Selalu Aktif*
├❏ *https://saweria.co/Aryamanik*
╰───────────────╯`, id) //if user is not registered
            }
        }

        function cekumur(obj){
            if (obj === true){
                return false
            } else {
                return manik.reply(from, `Kamu belum cukup umur untuk menggunakan manik, min 16 tahun\n\nKamu bisa mendaftar ulang dengan cara donasi terlebih dahulu, bales ${prefix}donasi\nHubungi Owner : wa.me/6285737134572`, id) //if user is not registered
            }
        }

        const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
    
    const sotoy = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍒 : 🍐',
        '🍊 : 🍋 : 🔔',//by Fadhlur Owner of NotBot
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍐 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍒 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🍋 : 🍋 : 🍌',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍐 : 🍇',
        '🔔 : 🔔 : 🔔',
        '🍒 : 🍒 : 🍒',
        '🍌 : 🍌 : 🍌'
        ]

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: '[❗] Kirim gambar dengan caption *#sticker* atau tag gambar yang sudah dikirim',
                Ti: '[❗] Replay sticker dengan caption *#stickertoimg* atau tag sticker yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
       
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }
        
        // FUNCTION
    // https://github.com/Gimenz/Mg-v2-WhatsApp-BOT/blob/803c5a0dc89e2a9e7bb118d1a8872fecd97d397e/msg/index.js#L76
        function isStickerMsg(id){
            if (isOwner, isAdmin) {return false;}
            let found = false;
            for (let i of stickerspam){
                if(i.id === id){
                    if (i.msg >= 12) {
                        found === true 
                        manik.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis oleh manik', message.id).then(() => {
                            manik.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(stickerspam).forEach((i) => {
                                if(stickerspam[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                stickerspam[found].msg = 1;
                                const resultx = 'Database telah direset!'
                                console.log(stickerspam[found])
                                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                                manik.sendText(from, resultx)
                            } else {
                                    manik.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                stickerspam.push(obj);
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                return false;
            }  
        }
        function addStickerCount(id){
            if (isOwner, isAdmin) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
            }
        }

        function isBadwordMsg(id){
            if (isOwner, isAdmin) {return false;}
            let kasar = false;
            for (let i of msgBadword){
                if(i.id === id){
                    let msg = i.msg
                    if (msg >= 12) { // 12x
                        kasar === true 
                        manik.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗𝗪𝗢𝗥𝗗 」*\nKamu telah berkata kasar di grup ini, kamu akan di kick otomatis oleh manik!', message.id).then(() => {
                            manik.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(msgBadword).forEach((i) => {
                                if(msgBadword[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                msgBadword[found].msg = 1;
                                const resultv = 'Database telah direset'
                                console.log(msgBadword[found])
                                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                                manik.sendText(from, resultv)
                            } else {
                                    manik.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    }else{
                        kasar === true
                        return false;
                    }   
                }
            }
            if (kasar === false){
                let obj = {id: `${id}`, msg:1};
                msgBadword.push(obj);
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                return false;
            }  
        }
        function addBadCount(id){
            if (isOwner, isAdmin) {return;}
            var kasar = false
            Object.keys(msgBadword).forEach((i) => {
                if(msgBadword[i].id == id){
                    kasar = i
                }
            })
            if (kasar !== false) {
                msgBadword[kasar].msg += 1;
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
            }
        }
    // https://github.com/ItzNgga/wa-bot.js/blob/d58ddcf4e27b93535dd806e4a07a6ef2fb52463d/index.js#L204
        function isMsgLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 8) {
                                found === true 
                                manik.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!`, id)
                                manik.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 8){
                                found === true
                                manik.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!`, id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
        function addMsgLimit(id){
                    if (isAdmin) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
        function isLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                manik.reply(from, `Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
        function limitAdd (id) {
                    if (isAdmin) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
        
                // END HELPER FUNCTION
        // FUNCTION DAFTAR! NEXT UPDATE
        function monospace(string) {
            return '```' + string + '```'
        }

        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
    if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isAdmin && !isOwner){
            if(stickermsg === true){
                if(isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }

        if(!isCmd && isKasar && isGroupMsg && isBadword && !isGroupAdmins) { 
            console.log(color('[BADWORD]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
            if(isBadwordMsg(serial)) return
                addBadCount(serial)
        }
        
                if(body === '#mute' && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isAdmin) return manik.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        manik.reply(from, 'Bot telah di mute pada chat ini! #unmute untuk unmute!', id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, 'Bot telah di mute pada chat ini! #unmute untuk unmute!', id)
                    }
                }
                if(body === '#unmute' && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isAdmin) return manik.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        manik.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        manik.reply(from, 'Bot telah di unmute!', id)                   
                    }
                }
                if (body === '#unbanchat') {
                    if (!isOwner) return manik.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner manik!', id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    manik.reply('Global chat has been disable!')
                }
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {

        case prefix+'banchat':
            if (setting.banChats === true) return
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            manik.reply(from, 'Global chat has been disable!', id)
            break

        case prefix+'unmute':
            console.log(`Unmuted ${name}!`)
            await manik.sendSeen(from)
            break
        case prefix+'unbanchat':
            console.log(`Banchat ${name}!`)
            await manik.sendSeen(from)
            manik.reply(from, 'Global chat has been enable!', id)
            break
        case prefix+'sticker':
        case prefix+'stiker':
        case prefix+'s':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await manik.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await manik.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await manik.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    manik.reply(from, mess.error.Iv, id)
                }
            } else {
                    manik.reply(from, mess.error.St, id)
            }
            break
        case prefix+'ttp':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                try
                {
                    const string = body.toLowerCase().includes('#ttp') ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await manik.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await manik.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await manik.reply(from, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await manik.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await manik.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await manik.reply(from, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await manik.reply(from, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break;
        case prefix+'ttp2':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#ttp2 [ Teks ]*, contoh *#ttp2 manik*`, id)
            const ttp2t = body.slice(6)
            const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
            const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
            await manik.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${vhtearkey}`)
            break
        case prefix+'ttg':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsgObj == null) {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *#ttg [ Teks ]*, contoh *#ttg aku bukan boneka*`, id)
                        await manik.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${body.slice(5)}&apikey=${vhtearkey}`)
                        limitAdd(serial)
                } else {
                    await manik.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${quotedMsgObj}&apikey=${vhtearkey}`)
                    limitAdd(serial)
                }
            } catch(e) {
                console.log(e)
                manik.reply(from, 'Maaf, Server sedang Error')
            }
            break
        case prefix+'pastebin': //BY VINZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length == 1) return manik.reply(from, `Ketik command ${prefix}pastebin [text]|[nama]\nContoh ${prefix}pastebin ini contohnya|tolll`, id)
            await manik.reply(from, mess.wait, id)
            var bdtrm = body.slice(10).trim().split('|')
            const pstbn = await axios.get(`https://zeksapi.herokuapp.com/api/pastebin?apikey=benbenz&text=${bdtrm[0]}&name=${bdtrm[1]}`) 
        console.log(bdtrm[0])
        if (pstbn.data.status == false) return manik.reply(from, pstbn.data.message ,id)
            await manik.reply(from, pstbn.data.result, id) 
            break
        case prefix+'magernulis1': // BY MFARELS
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return await manik.reply(from, 'Kirim perintah *prefix+magernulis1 [teks]*', id)  // BY MFARELS
            const farel = body.slice(13)  // YOUTUBE : MFARELS CH
            await manik.reply(from, mess.magernulissatu, id)  // INSTAGRAM : @mfarelsyahtiawan
            const zahra = farel.replace(/(\S+\s*){1,10}/g, '$&\n')  // INSTALL IMAGEMAGICK KALO WAU WORK
            const farelzahra = zahra.split('\n').slice(0, 33).join('\n')  // WAKTU INSTALL IMAGEMAGICK CENTANG KOLOM 1,2,3,5,6
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const zahrafarel = (day + ' ' + months[month] + ' ' + year)
            const farelllzahraaa = (thisDay)
            spawn('convert', [
                './mager/magernulis/magernulis1.jpg',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '700x960',
                '-pointsize',
                '100',
                '-interline-spacing',
                '1',
                '-annotate',
                '+4100+460',
                farelllzahraaa,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '700x960',
                '-pointsize',
                '100',
                '-interline-spacing',
                '1',
                '-annotate',
                '+4100+640',
                zahrafarel,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '6000x8000',
                '-pointsize',
                '130',
                '-interline-spacing',
                '1',
                '-annotate',
                '+1010+1010',
                farelzahra,
                './mager/magernulis√/magernulis1√.jpg'
            ])
            .on('error', () => manik.reply(from, 'Error Bjeer', id))
            .on('exit', () => {
                manik.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'magernulis.jpg', '*Sukses Nulis DiBuku✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n\n*© Powered By MFarelS | RajinNulis-BOT*', id)
            })
            break  // BY MFARELS
        case prefix+'stickertoimg':
        case prefix+'toimg':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                manik.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu!`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await manik.sendFile(from, imageBase64, 'imagesticker.jpg', 'Success Convert Sticker to Image!', id)
            } else if (!quotedMsg) return manik.reply(from, `Mohon tag sticker yang ingin dijadikan gambar!`, id)
            break
        case prefix+'stickergif': // INSTALL FFMPEG, IF YOU WANT THIS COMMAND WORK!
        case prefix+'stikergif': // TUTORIAL IN README, PLEASE READ!
        case prefix+'sgif': // MRHRTZ
            manik.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'video' || mimetype === 'image/gif') {
                try {
                    const mediaData = await decryptMedia(message, uaOverride)
                    await manik.sendMp4AsSticker(from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
                } catch (e) {
                    manik.reply(from, `Size media terlalu besar! mohon kurangi durasi video.`)
                }
            } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                await manik.sendMp4AsSticker(from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
            } else {
                manik.reply(from, `Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik #stickergif`, id)
            } 
            break
        case prefix+'stickerlightning':
        case prefix+'slightning':
        case prefix+'slight':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            manik.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await manik.sendStickerfromUrl(from, Slight)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await manik.sendStickerfromUrl(from, Slight)
            } else {
                await manik.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerlightning`, id)
            }
            break
        case prefix+'stickerfire':
        case prefix+'sfire':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            manik.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await manik.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await manik.sendStickerfromUrl(from, Sfire)
            } else {
                await manik.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerfire`, id)
            }
            break
        case prefix+'lovemessage':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}lovemessage [ Teks ]*, contoh *${prefix}lovemessage manik*`, id)
            manik.reply(from, mess.wait, id)
            const lovemsg = body.slice(12)
            if (lovemsg.length > 10) return manik.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await manik.sendFileFromUrl(from, `https://api.vhtear.com/lovemessagetext?text=${lovemsg}&apikey=${vhtearkey}`, 'lovemsg.jpg', '', id)
            break
        case prefix+'romance':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}romance [ Teks ]*, contoh *${prefix}romance manik*`, id)
            manik.reply(from, mess.wait, id)
            const rmnc = body.slice(9)
            if (rmnc.length > 10) return manik.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await manik.sendFileFromUrl(from, `https://api.vhtear.com/romancetext?text=${rmnc}&apikey=${vhtearkey}`, 'romance.jpg', '', id)
            break
        case prefix+'party':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}party [ Teks ]*, contoh *${prefix}party manik*`, id)
            manik.reply(from, mess.wait, id)
            const prty = body.slice(7)
            if (prty.length > 10) return manik.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await manik.sendFileFromUrl(from, `https://api.vhtear.com/partytext?text=${prty}&apikey=${vhtearkey}`, 'party.jpg', '', id)
            break
        case prefix+'silk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}silk [ Teks ]*, contoh *${prefix}silk manik*`, id)
            manik.reply(from, mess.wait, id)
            const slkz = body.slice(5)
            if (slkz.length > 10) return manik.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await manik.sendFileFromUrl(from, `https://api.vhtear.com/silktext?text=${slkz}&apikey=${vhtearkey}`, 'silk.jpg', '', id)
            break
        case prefix+'blackpink':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#blackpink [ Teks ]*, contoh *#blackpink manik*`, id)
            manik.reply(from, mess.wait, id)
            const blpk = body.slice(11)
            if (blpk.length > 10) return manik.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await manik.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${blpk}&apikey=${vhtearkey}`, 'blackpink.jpg', '', id)
            break
        case prefix+'thunder':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#thunder [ Teks ]*, contoh *#thunder manik*`, id)
            manik.reply(from, mess.wait, id)
            const thndr = body.slice(9)
            if (thndr.length > 10) return manik.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await manik.sendFileFromUrl(from, `https://api.vhtear.com/thundertext?text=${thndr}&apikey=${vhtearkey}`, 'thndr.jpg', '', id)
            break
        case prefix+'pornhub':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#pornhub [ |Teks1|Teks2 ]*, contoh *#pornhub |manik|Dev manik*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                manik.reply(from, mess.wait, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]
                if (lpornhub.length > 10) return manik.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2.length > 10) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                manik.sendFileFromUrl(from, `https://api.vhtear.com/pornlogo?text1=${lpornhub}&text2=${lpornhub2}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await manik.reply(from, `Wrong Format!\n[❗] Kirim perintah *#pornhub [ |Teks1|Teks2 ]*, contoh *#pornhub |manik|Dev manik*`, id)
            }
            break
        case prefix+'glitch':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#glitch [ |Teks1|Teks2 ]*, contoh *#glitch |manik|Dev manik*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                manik.reply(from, mess.wait, id)
                const glitch1 = argz[1]
                const glitch2 = argz[2]
                if (glitch1.length > 10) return manik.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (glitch2.length > 15) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 15 huruf!_', id)
                manik.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${glitch1}&text2=${glitch2}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await manik.reply(from, `Wrong Format!\n[❗] Kirim perintah *#glitch [ |Teks1|Teks2 ]*, contoh *#glitch |manik|Dev manik*`, id)
            }
            break
        case prefix+'daftar':  // NAMBAHIN NOMOR DI DATABASE
                argz = body.trim().split('|')
                if (argz.length >= 2) {
                const nonye = sender.id
                const namanye = argz[1]
                const umurnye = argz[2]
                    if(isNaN(umurnye)) return await manik.reply(from, 'Umur harus berupa angka!!\nLiat contoh lah bogeng', id)
                    if(umurnye >= 40) return await manik.reply(from, 'Tua bet anjir!!, kembali lagi ke masa muda untuk menggunakan MANIK', id)
                    const jenenge = namanye.replace(' ','')
                    var ceknya = nonye
                        var obj = pendaftar.some((val) => {
                            return val.id === ceknya
                        })
                        if (obj === true){
                            return manik.reply(from, 'kamu sudah terdaftar', id) // BAKAL RESPON JIKA NO UDAH ADA
                        } else {
                            const mentah = await manik.checkNumberStatus(nonye) // PENDAFTARAN
                            const msg = monospace(`╭◪ REGISTER SUKSES
╰───────────────╮  
╭───────────────╯
├❏ *Daftar dengan SN: ${SN} *
├❏ *pada ${moment().format('DD/MM/YY HH:mm:ss')}*
╰───────────────╯
╭───────────────╮
├❏ *[Nama]: ${jenenge} [@${nonye.replace(/[@c.us]/g, '')}]*
├❏ *[Nomor]: wa.me/${nonye.replace('@c.us', '')}*
├❏ *[Umur]: ${umurnye}*
├❏ *Jangan Lupa Donasi Agar Bot Selalu Aktif*
├❏ *https://saweria.co/Aryamanik*
╰───────────────╯
Untuk menggunakan bot silahkan kirim ${prefix}menu
Total Pengguna yang telah terdaftar ${pendaftar.length}`)

                            const hasil = mentah.canReceiveMessage ? msg : false
                            if (!hasil) return manik.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                            {
                            const register = ({
                                id: mentah.id._serialized,
                                nama: jenenge,
                                umur: umurnye
                            })
                            pendaftar.push(register)
                            fs.writeFileSync('./lib/database/user.json', JSON.stringify(pendaftar)) // DATABASE
                                manik.sendTextWithMentions(from, hasil)
                            }
                        }
                    } else {
                        await manik.reply(from, `Format yang kamu masukkan salah, kirim ${prefix}daftar |nama|umur\n\ncontoh format: ${prefix}daftar |ahmad|17\n\ncukup gunakan nama depan/panggilan saja`, id) //if user is not registered
                    }
                break
                case 'bot':
            {
                manik.sendPtt(from, './media/sound9.mp3', id)
            }
             break
             case 'manik':
             {
                manik.sendFileFromUrl(from, `https://i.ibb.co/64FZZLJ/IMG-20201211-WA0361.jpgs`,`manik.jpg`,`NI MANIK:V`, id)
             }
             break
             case 'oyasumi':
            {
                manik.sendPtt(from, './media/oyasumi.mp3', id)
            }
            break
            case 'ohayo':
            {
                manik.sendPtt(from, './media/ohayo.mp3', id)
            }
             break
             case 'sadnime':
             {
                manik.sendPtt(from, './media/sad.mp3', id)
             }
             break
             case '@6285737134572':
                manik.reply(from, 'KENAPA TAG OWNER GW?\nKALO GA DIBALAS MUNGKIN SIBUK!\nJANGAN DISPAM YA!!', id)
             break
             case prefix+'mute':
           if (!isAdmin) return manik.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!', id)
     manik.reply(from, 'Bot telah di mute pada chat ini! #unmute untuk unmute!', id)
     break
            case prefix+'daftarulang':
                    if (!isOwner) return manik.reply(from, 'Command ini hanya dapat digunakan oleh user premium manik', id)  
                    const nomernya = args[1]
                    let textnya = nomernya.replace(/[-\s+@c.us]/g,'')
                    const cusnya = textnya + '@c.us'
                    const umurnya = args[2]
                    if(umurnya >= 40) return await manik.reply(from, 'Umur terlalu tua kak, max 40 yaa :D', id)
                        var found = false
                        Object.keys(pendaftar).forEach((i) => {
                            if(pendaftar[i].id == cusnya){
                                found = i
                            }
                        })
                        if (found !== false) {
                            pendaftar[found].umur = umurnya;
                            const updated = pendaftar[found]
                            const result = monospace(`╭◪ UPDATE SUKSES
╰───────────────╮  
╭───────────────╯
├❏ *Update data SN: ${SN} *
├❏ *pada ${moment().format('DD/MM/YY HH:mm:ss')}*
╰───────────────╯
╭───────────────╮
├❏ *[Nama]: ${updated.nama} | @${updated.id.replace(/[@c.us]/g, '')}*
├❏ *[Nomor]: wa.me/${updated.id.replace('@c.us', '')}*
├❏ *[Umur]: ${updated.umur}
├❏ *Jangan Lupa Donasi Agar Bot Selalu Aktif*
├❏ *https://saweria.co/Aryamanik*
╰───────────────╯
Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            console.log(pendaftar[found])
                            fs.writeFileSync('./lib/database/user.json',JSON.stringify(pendaftar));
                            manik.sendTextWithMentions(from, result, id)
                        } else {
                                manik.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                        }
                break
        case prefix+'groupinfo' :
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            isMuted(chatId) == false
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = welkom.includes(chat.id)
            var leftgrp = left.includes(chat.id)
            var ngrp = nsfw_.includes(chat.id)
            var antlink = antilink.includes(chat.id)
            var simu = simi_.includes(chat.id)
            var stprt = antisticker.includes(chat.id)
            var antbad = antibadword.includes(chat.id)
            var grouppic = await manik.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await manik.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*
*➸ *Name : ${groupname}* 
*➸ Members : ${totalMem}*
*➸ Welcome : ${welgrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ Left : ${leftgrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ NSFW : ${ngrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ Simsimi : ${simu ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Sticker : ${stprt ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Link : ${antlink ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Badword : ${antbad ? 'Aktif' : 'Tidak Aktif'}*
*➸ Group Description* 
${desc}`)
            break
        case prefix+'quoterandom' :
        case prefix+'quote' :
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            manik.sendText(from, quotedd())
            break
            case prefix+'nulis2':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
           if (!isAdmin) return manik.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#nulis0 [ |Nama|Kelas|Isi ]*, contoh *#nulis0 |manik|11|blablabla*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                manik.reply(from, mess.wait, id)
                const nama = argz[1]
                const kelas = argz[2]
                const isi = argz[3]
                if (nama.length > 10) return manik.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (kelas.length > 15) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 15 huruf!_', id)
                if (isi.length > 1000) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 1000 huruf!_', id)
                manik.sendFileFromUrl(from, `https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${isi}&tinta=4`)
                await limitAdd(serial)
            } else {
                await manik.reply(from, `Wrong Format!\n[❗] Kirim perintah *#nulis0 [ |Nama|Kelas|Isi ]*, contoh *#nulis0 |manik|11|blablabla*`, id)
            }
            break
            case prefix+'burnpaper':
if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
const crid = body.slice(11)
                if (!crid) return manik.reply(from, 'Kirim perintah *#burnpaper [teks]*\n\nContoh *#burnpaper MANIK*', id)
                if (crid.length > 12) return manik.reply(from, 'Maksimal 12 Huruf!', id)
                manik.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/burnpaper/?text=${crid}`,`${crid}.jpg`,`Hallypottel ${crid}`, id)        
                await limitAdd(serial)
             break
             case prefix+'8bit':
if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
if (args.length === 1) return manik.reply(from, `Kirim perintah *#8bit [ |Teks1|Teks2 ]*, contoh *#8bit |manik|Dev manik*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                manik.reply(from, mess.wait, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]
                if (lpornhub.length > 10) return manik.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2.length > 10) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/8bit/?text1=${lpornhub}&text2=${lpornhub2}`)
                await limitAdd(serial)
            } else {
                await manik.reply(from, `Wrong Format!\n[❗] Kirim perintah *#pornhub [ |Teks1|Teks2 ]*, contoh *#pornhub |manik|Dev manik*`, id)
            }
            break
            case prefix+'glowneon':
if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}glowneon manik`, id)
const cred = body.slice(10)
                if (!cred) return manik.reply(from, 'Kirim perintah *#glowneon [teks]*\n\nContoh *#glowneon MANIK*', id)
                if (cred.length > 12) return manik.reply(from, 'Maksimal 12 Huruf!', id)
                manik.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/glowingneon/?text=${cred}`,`${cred}.jpg`,`nanana ${cred}`, id)        
                await limitAdd(serial)
             break
             case prefix+'gsuggest':
if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
if (args.length === 1) return manik.reply(from, `Kirim perintah *#8bit [ |Teks1|Teks2 ]*, contoh *#8bit |manik|Dev manik*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                manik.reply(from, mess.wait, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]
                const lpornhub3 = argz[3]
                if (lpornhub.length > 10) return manik.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2.length > 10) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub3.length > 10) return manik.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/gsuggest/?text1=${lpornhub}&text2=${lpornhub2}&text3=${lpornhub3}`)
                await limitAdd(serial)
            } else {
                await manik.reply(from, `Wrong Format!\n[❗] Kirim perintah *#pornhub [ |Teks1|Teks2 ]*, contoh *#pornhub |manik|Dev manik*`, id)
            }
            break
            case 'truth':
            case prefix+'truth':
               if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                const trutu =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
                    const ttrthh = trutu[Math.floor(Math.random() * trutu.length)]
                    manik.reply(from, '*truth*\n\n'+ ttrthh )
                    await limitAdd(sender)
                    break
                case 'dare':
                case prefix+'dare':
                if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
                    const der = dare[Math.floor(Math.random() * dare.length)]
                    manik.reply(from, '*Dare*\n\n'+ der )
                    await limitAdd(sender)
                    break
            case prefix+'katamanik':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const trut =['” Nggak ada yang peduli denganmu di sosmed kecuali kamu cakep” - Kata manik.','” Sesimpel ini deh, sibuk itu palsu, semua tergantung prioritas” – kata manik.','” Dia hanya menghargaimu, bukan mencintaimu” – kata manik.','” Keadilan sosial hanya berlaku bagi warna negara yang good looking ” – kata manik.','” Jangan jadi pelangi untuk orang yang buta warna ” – kata manik.','” Dia yang tertidur nyenyak setelah mematahkan hatimu tidak pantas untuk kamu ingat ” – kata manik.','” Dia cuman bercanda, harusnya kamu ketawa, bukan malah jatuh cinta ” – kata manik.','” Mencintaimu adalah seni menyakiti diri ‘ – kata manik.','” Jika tidak bisa mewarnai hidup seseorang, maka jangan pudarkan warna aslinya ” – kata manik.','” Cukup tahu namaku, jangan rupaku” – kata manik.','” Sesuatu akan terasa berharga jika sudah kehilangan ” – kata manik.','” Jangan pernah mengeluh ketika kopimu dingin, ia pernah hangat, namun kau diamkan ” – kata manik.','”Sadar akan kekurangan lebih baik daripada bangga akan kelebihan” - kata manik.','”Ingat, ini hanya hari yang buruk, bukan kehidupan yang buruk” - kata manik.','”Lakukan sesuatu hari ini yang akan membuat dirimu di masa depan berterima kasih” - kata manik.','”Tinggalkan pikiran yang membuatmu lemah, dan peganglah pikiran yang memberi kekuatan bagimu” - kata manik.','”Tidak masalah seberapa lambat kamu berjalan selama kamu tidak berhenti” - kata manik.','”Apapun yang kamu lakukan, jangan pernah menyerah untuk mendapatkannya” - kata manik.','”Jangan pernah berhenti ketika kamu masih belum ingin menyerah” - kata manik.','”Kesuksesan tidak menemukan kamu. Kamu harus keluar dan meraihnya” - kata manik.','”Beberapa orang memimpikan kesuksesan, sementara yang lain bangun setiap pagi untuk mewujudkannya” - kata manik.','”Lebih baik hidup satu hari sebagai singa, daripada seribu hari sebagai domba” - kata manik.','”Hidup itu seperti kamera. Fokus saja pada apa yang penting, tangkap saat-saat indah, kembangkan dari hal-hal negatif, dan jika hal-hal tidak berhasil, ambil foto lain” - kata manik.','”Keheningan yang bermakna selalu lebih baik daripada kata-kata yang tidak berarti” - kata manik.','”Hanya karena jalanku berbeda, tidak berarti aku tersesat” - kata manik.','”Memiliki hati yang lembut di dunia yang kejam adalah keberanian, bukan kelemahan” - kata manik.','”Rahasia kebahagiaan adalah jangan pernah mengharapkan apa pun dari siapapun, maka kamu tidak akan pernah kecewa” - kata manik.','”Hidup itu seperti piano. Tuts putih melambangkan kebahagiaan dan tuts hitam menunjukkan kesedihan. Namun, saat kamu menjalani perjalanan hidup, ingatlah bahwa tuts hitam juga menghasilkan musik” - kata manik.','”Ketika kamu tidak menemukan solusi untuk suatu masalah, itu mungkin bukan masalah yang harus diselesaikan, melainkan kebenaran yang harus diterima” - kata manik.','”Orang yang paling kesepian adalah yang paling baik hati. Orang yang paling sedih, tersenyum paling cerah. Orang yang paling rusak adalah yang paling bijaksana. Semua karena mereka tidak ingin melihat orang lain menderita seperti yang mereka alami” - kata manik.','”Harapan adalah satu-satunya hal yang lebih kuat dari ketakutan” - kata manik.','”Setiap orang suci memiliki masa lalu dan setiap orang berdosa memiliki masa depan” - kata manik.']
                    const ttrth = trut[Math.floor(Math.random() * trut.length)]
                    manik.sendText(from, '*Manik Best:)*\n\n'+ ttrth )
                    await limitAdd(sender)
                    break
            case prefix+'tovid':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                manik.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu!`, id)
                const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await manik.sendFile(from, videoBase64, 'imagesticker.mp4', 'Success Convert Sticker to Video!', id)
            } else if (!quotedMsg) return manik.reply(from, `Mohon tag sticker yang ingin dijadikan Video!`, id)
            break
            case 'spamcall':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isAdmin) return manik.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!`, id)
            call = `${body.slice(11)}`
            anu = await fetch(`https://videfikri.com/api/call/?nohp=${call}`, {method: 'get'})
            manik.sendText(from, 'Success')
            break  
            case 'spamgmail':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isAdmin) return manik.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!`, id)
            spam = `${body.slice(10)}`
            anu = await fetch(`https://videfikri.com/api/spamemail/?email=${spam}&subjek=PT.PLN&pesan=Silahkan%20bayar%20tagihan%20listrik%20Anda`, {method: 'get'})
            manik.sendText(from, 'Success')
            break  
        case prefix+'tts':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (args.length === 1) return manik.reply(from, 'Kirim perintah *#tts [ Bahasa ] [ Teks ]*, contoh *#tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return manik.reply(from, 'Masukkan teksnya', id)
                if (dataText.length > 500) return manik.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts.mp3', dataText, function () {
                manik.sendPtt(from, './media/tts.mp3', id)
                limitAdd(serial)
                })
            } catch (err){
                console.log(err)
                manik.reply(from, bahasa_list, id)
            }
            break
        case prefix+'koin':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
              manik.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
              manik.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
            break
        case prefix+'dadu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            await manik.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
            break
        case prefix+'kapankah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) manik.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await manik.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
            break
        case prefix+'nilai':
        case prefix+'rate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) manik.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await manik.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case prefix+'apakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) manik.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await manik.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
            break
         case prefix+'bisakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) manik.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await manik.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
            break
        case prefix+'owner':
        case prefix+'creator':
        case prefix+'manik':
            manik.sendContact(chatId, `6285737134572@c.us`)
            await manik.sendFileFromUrl(from, `https://i.ibb.co/64FZZLJ/IMG-20201211-WA0361.jpgs`,`manik.jpg`,`NEH NOMOR OWNER TERGANZZ:V \n              SEREPEETTTT!!`, id)
            break
        case prefix+'resetsticker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isAdmin) return manik.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!`, id)
            if (!args.length === 1) return manik.reply(from, `Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: #resetsticker 62852262236155 / #resetsticker @member`, id) 
            const nomebr = args[1]
            let textz = nomebr.replace(/[-\s+@c.us]/g,'')
            const cuss = textz + '@c.us'
                var found = false
                Object.keys(stickerspam).forEach((i) => {
                    if(stickerspam[i].id == cuss){
                        found = i
                    }
                })
                if (found !== false) {
                    stickerspam[found].msg = 1;
                    const result = 'DB Sticker Spam has been reset'
                    console.log(stickerspam[found])
                    fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                    manik.reply(from, result, from)
                    limitAdd(serial)
                } else {
                        manik.reply(from, `Maaf, Nomor itu tidak terdaftar di database!`, id)
                }
            break
        case prefix+'resetbadword':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
                    if(isLimit(serial)) return
                    if (!isGroupAdmins) return manik.reply(from, 'Command ini hanya dapat digunakan oleh admin grup')  
                    if (!args.length === 1) return manik.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: #resetbadword 6285112554122 / #resetbadword @member') 
                    const nomer = args[1]
                    let text = nomer.replace(/[-\s+@c.us]/g,'')
                    const cus = text + '@c.us'
                        var found = false
                        Object.keys(msgBadword).forEach((i) => {
                            if(msgBadword[i].id == cus){
                                found = i
                            }
                        })
                        if (found !== false) {
                            msgBadword[found].msg = 1;
                            const result = 'DB Badword Spam has been reset'
                            console.log(msgBadword[found])
                            fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                            manik.reply(from, result, from)
                            limitAdd(serial)
                        } else {
                                manik.reply(from, `${monospace(`Di database ngga ada nomer itu dik`)}`, id)
                        }
                break
        // ON OFF
        case prefix+'antilink':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antilink.includes(chatId);
                if(cek){
                    return manik.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah Aktif`, id) //if number already exists on database
                } else {
                    antilink.push(chatId)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    manik.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antilink.includes(chatId);
                if(!cek){
                    return manik.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antilink.indexOf(chatId)
                    antilink.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    manik.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Nonaktif`, id)
                }
            } else {
                manik.reply(from, `Pilih enable atau disable udin!`, id)
            }
            break    
        case prefix+'antisticker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return manik.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
                 } else {
                    antisticker.push(chatId)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    manik.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return manik.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antisticker.indexOf(chatId)
                    antisticker.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    manik.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
                    limitAdd(serial)
                }
            } else {
                manik.reply(from, `Pilih enable atau disable udin!`, id)
            }
            break
        case prefix+'antibadword':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antibadword.includes(chatId);
                if(cek){
                    return manik.reply(from, `*「 ANTI BADWORD 」*\nSudah diaktifkan di grup ini`, id)
                } else {
                    antibadword.push(chatId)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    manik.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau manik Akan Kick!`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antibadword.includes(chatId);
                if(!cek){
                    return manik.reply(from, `*「 ANTI BADWORD 」*\nSudah dinonaktifkan di grup ini`, id)
                } else {
                    let nixx = antibadword.indexOf(chatId)
                    antibadword.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    manik.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau manik Akan Kick!`, id)
                }
            } else {
                manik.reply(from, `Pilih enable atau disable udin!`, id)
            } 
            break   
        case prefix+'nsfw':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return manik.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return manik.reply(from, `NSFW Sudah diaktifkan di grup ini`, id)
                } else {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                manik.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *#nsfwMenu* untuk mengetahui menu', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return manik.reply(from, `NSFW Sudah dinonaktifkan di grup ini`, id)
                } else {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                manik.reply(from, 'NSFW berhasil di nonaktifkan di group ini!', id)
                }
            } else {
                manik.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case prefix+'simi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isAdmin) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh user premium manik!', id) // Hanya Admin yang bisa mengaktifkan
            if (args.length === 1) return manik.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return manik.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.push(chat.id)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                manik.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *# [teks]*\nContoh : *# halo*', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return manik.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                manik.reply(from, 'Simsimi berhasil di nonaktifkan di group ini!', id)
                }
            } else {
                manik.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case prefix+'group':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (args.length === 1) return manik.reply(from, 'Pilih open atau close!', id)
            if (args[1].toLowerCase() === 'open') {
                manik.setGroupToAdminsOnly(groupId, false)
                manik.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us','')}\nSekarang *semua member* dapat mengirim pesan`)
            } else if (args[1].toLowerCase() === 'close') {
                manik.setGroupToAdminsOnly(groupId, true)
                manik.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            } else {
                manik.reply(from, 'Pilih open atau disable close!', id)
            }
            break
            case prefix +'close':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            manik.sendText(from, 'pilih 1-5 menit untuk menutup group ya\nContoh: #close1menit')
            break
            case prefix+'close1menit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            manik.sendText(from, `Group akan ditutup 1 menit lagi...`, id)
            await sleep(50000)
            manik.sendText(from, `10 detik lagi group akan ditutup👋`)
            await sleep(10000)
            manik.sendText(from, `babay👋`)
            manik.setGroupToAdminsOnly(groupId, true)
            manik.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            break
            case prefix+'close2menit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            manik.sendText(from, `Group akan ditutup 2 menit lagi...`, id)
            await sleep(110000)
            manik.sendText(from, `10 detik lagi group akan ditutup👋`)
            await sleep(10000)
            manik.sendText(from, `babay👋`)
            manik.setGroupToAdminsOnly(groupId, true)
            manik.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            break
            case prefix+'close3menit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            manik.sendText(from, `Group akan ditutup 3 menit lagi...`, id)
            await sleep(170000)
            manik.sendText(from, `10 detik lagi group akan ditutup👋`)
            await sleep(10000)
            manik.sendText(from, `babay👋`)
            manik.setGroupToAdminsOnly(groupId, true)
            manik.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            break
            case prefix+'close4menit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            manik.sendText(from, `Group akan ditutup 4 menit lagi...`, id)
            await sleep(230000)
            manik.sendText(from, `10 detik lagi group akan ditutup👋`)
            await sleep(10000)
            manik.sendText(from, `babay👋`)
            manik.setGroupToAdminsOnly(groupId, true)
            manik.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            break
            case prefix+'close5menit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            manik.sendText(from, `Group akan ditutup 5 menit lagi...`, id)
            await sleep(290000)
            manik.sendText(from, `10 detik lagi group akan ditutup👋`)
            await sleep(10000)
            manik.sendText(from, `babay👋`)
            manik.setGroupToAdminsOnly(groupId, true)
            manik.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            break
        case prefix+'left':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return manik.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                manik.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                manik.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                manik.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case prefix+'welcome':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return manik.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                manik.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                manik.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                manik.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        // ANIME //
        case prefix+'neonime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)

            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}neonime [ Query ]*, Contoh : #neonime danmachi`)
            const nenon = body.slice(9)
            manik.reply(from, mess.wait, id)
            try {
                const response2 = await fetch('https://tobz-api.herokuapp.com/api/neonime?q=' + nenon + '&apikey=' + tobzkey)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*「 NEONIME 」*\n\n*Hasil Pencarian : ${nenon}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n• *Title* : ${result[i].title}\n• *Deskripsi* : ${result[i].desc}\n• *Link* : ${result[i].link}`
                }
                await manik.sendFileFromUrl(from, result[0].image, 'neon.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
            }
            break
        case prefix+'kusonime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#kusonime [query]*\nContoh : *#kusonime darling in the franxx*', id)
            const animeq = await axios.get('https://tobz-api.herokuapp.com/v1/kuso?q=' + body.slice(7)  + '&apikey=' + tobzkey)
            if (animeq.data.error) return manik.reply(from, animeq.data.error, id)
            const res_animeq = `${animeq.data.title}\n\n${animeq.data.info}\n\n${animeq.data.sinopsis}\n\n${animeq.data.link_dl}`
            manik.sendFileFromUrl(from, animeq.data.thumb, 'kusonime.jpg', res_animeq, id)
            await limitAdd(serial)
            break
        case prefix+'dewabatch':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#dewabatch [query]*\nContoh : *#dewabatch darling in the franxx*', id)
            const animek = await axios.get('https://tobz-api.herokuapp.com/v1/dewabatch?q=' + body.slice(7)  + '&apikey=' + tobzkey)
            if (animek.data.error) return manik.reply(from, animek.data.error, id)
            const res_animek = `${animek.data.result}\n\n${animek.data.sinopsis}`
            manik.sendFileFromUrl(from, animek.data.thumb, 'dewabatch.jpg', res_animek, id)
            await limitAdd(serial)
            break
        case prefix+'pinterest':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#pinterest [query]*\nContoh : *#pinterest manik*', id)
            const ptrsq = body.slice(11)
            const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${ptrsq}&apikey=${vhtearkey}`)
            if (!ptrst.ok) throw new Error(`Error Pinterest : ${ptrst.statusText}`)
            const ptrs = await ptrst.json()
            const ptrsn = ptrs.result
            const b = JSON.parse(JSON.stringify(ptrsn))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            await manik.sendImage(from, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${ptrsq}*`)
            await limitAdd(serial)
            break
        case prefix+'nhview':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#nhview [212121]*\nContoh : *#nhview 321421*', id)
            const nhsh = body.slice(11)
            const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code='+nhsh)
            for (let i = 0; i < nhsh2.length; i++) {
                await manik.sendImage(from, nhsh2[i].data, 'thumbserc.jpg', '', id)
                }
            limitAdd(serial)
            break
        case prefix+'loli':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtearkey}`)
            const loly = loli.data.result
            manik.sendFileFromUrl(from, loly.result, 'loli.jpeg', '*LOLI*', id)
            await limitAdd(serial)
            break
        case prefix+'shota':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            manik.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
            limitAdd(serial)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
        case prefix+'waifu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const waifu = await axios.get('https://tobz-api.herokuapp.com/api/waifu?apikey=' + tobzkey)
            manik.sendFileFromUrl(from, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
            await limitAdd(serial)
            break
        case prefix+'husbu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const diti = fs.readFileSync('./lib/database/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            manik.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            await limitAdd(serial)
            break
        case prefix+'randomnekonime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const nekonime = await axios.get('https://tobz-api.herokuapp.com/api/nekonime?apikey=' + tobzkey)
            const nekon = nekonime.data
            if (nekon.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            manik.sendFileFromUrl(from, nekon.result, `Nekonime${ext}`, 'Nekonime!', id)
            await limitAdd(serial)
            break
        // MFARELS
        case prefix+'bokep': // MFARELS
        case prefix+'randombokep': // MFARELS
        case prefix+'bkp': // MFARELS
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id) // MFARELS
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id) // MFARELS
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id) // MFARELS
            const mskkntl = fs.readFileSync('./lib/database/18+.json') // MFARELS
            const kntlnya = JSON.parse(mskkntl) // MFARELS
            const rindBkp = Math.floor(Math.random() * kntlnya.length) // MFARELS
            const rindBkep = konsolJsin[rindBkp] // MFARELS
            manik.sendFileFromUrl(from, rindBkep.image, 'Bokep.jpg', rindBkep.teks, id) // MFARELS
            await limitAdd(serial)
            break // MFARELS
        // MFARELS
        case prefix+'randomtrapnime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=' + tobzkey)
            const trapn = trapnime.data.result
            if (trapn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            manik.sendImage(from, trapn.result, `trapnime${ext}`, 'Trapnime!', id)
            await limitAdd(serial)
            break
        case prefix+'randomhentai':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const hentai = await axios.get('https://tobz-api.herokuapp.com/api/hentai?apikey=' + tobzkey)
            const henta = hentai.data
            if (henta.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            manik.sendImage(from, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
            await limitAdd(serial)
            break
        case prefix+'randomnsfwneko':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko?apikey=' + tobzkey)
            const nsfwn = nsfwneko.data
            if (nsfwn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            manik.sendImage(from, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
            await limitAdd(serial)
            break
        case prefix+'randomanime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const ranime = await axios.get('https://tobz-api.herokuapp.com/api/randomanime?apikey=' + tobzkey)
            const ranimen = ranime.data
            if (ranimen.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            manik.sendFileFromUrl(from, ranimen.result, `RandomAnime${ext}`, 'Random Anime!', id)
            await limitAdd(serial)
            break
        case prefix+'randomblowjob':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            await limitAdd(serial)
            const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=' + tobzkey)
            const rblow = sblow.data
            manik.sendFileFromUrl(from, rblow.result, `RandoBlow${ext}`, 'Random Blowjob!', id)
            break
        case prefix+'randomhug':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug?apikey=' + tobzkey)
            const rhug = shug.data
            manik.sendFileFromUrl(from, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
            break
        case prefix+'randomcry':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry?apikey=' + tobzkey)
            const rcry = scry.data
            manik.sendFileFromUrl(from, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
            await limitAdd(serial)
            break
        case prefix+'randomkiss':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss?apikey=' + tobzkey)
            const rkiss = skiss.data
            manik.sendFileFromUrl(from, rkiss.result, `RandomKiss${ext}`, 'Random Kiss!', id)
            await limitAdd(serial)
            break
        case prefix+'subreddit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split(' ')
            const sr = argz[1]
            try {
            const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + sr + '/');
            const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                if (nsfw == true) {
                    if ((isGroupMsg) && (isNsfw)) {
                        await manik.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                        limitAdd(serial)
                    } else if ((isGroupMsg) && (!isNsfw)) {
                        await manik.reply(from, `Nsfw belum diaktifkan di Grup *${name}*`, id)
                    }
                } else { 
                    await manik.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                }
            } catch(err) {
                await manik.sendFileFromUrl(from, errorurl, id) 
            }
            break
        case prefix+'nhder':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                manik.sendText(from, caption)
                limitAdd(serial)
            } else {
                manik.sendText(from, 'Maaf tolong masukan code nuclear')
            }
            break
        /*case prefix+'wallanime' :
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const walnime = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            manik.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', id)
            break*/
        case prefix+'quotesnime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const skya = await axios.get('https://tobz-api.herokuapp.com/api/quotesnime/random?apikey=' + tobzkey)
            skya_ = skya.data
            manik.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
            await limitAdd(serial)
            break
        case prefix+'meme':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            manik.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            await limitAdd(serial)
            break
        case prefix+'quoteanime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                        if(args[1]){
                            if(args[1] === 'anime'){
                                const anime = body.slice(13)
                                axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    manik.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                    limitAdd(serial)
                                }).catch(err => {
                                    manik.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }else{
                                const char = body.slice(12)
                                axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    manik.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                    limitAdd(serial)
                                }).catch(err => {
                                    manik.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }
                        }else{
                            axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                                let penyanyi = data.result[0].penyanyi 
                                let judul = data.result[0].judul
                                let linkimg = data.result[0].linkImg
                                let lagu = data.result[0].linkMp3 
                                let size = data.result[0].filesize
                                let durasi = data.result[0].duration
                                manik.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`) 
                                limitAdd(serial)
                            }).catch(err => {
                                console.log(err)
                            })
                        }
            break
        case prefix+'maluser':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const username = body.slice(18)
            manik.reply(from, mess.wait, id)
            try {
                const result = await axios.get(`https://api.jikan.moe/v3/user/${username}`)
                const jikan =  result.data
                const Data = `*「 USER - MYANIMELIST 」*

• Username: ${jikan.username}
• User ID: ${jikan.user_id}
• Gender: ${jikan.gender}
• Location: ${jikan.location}
• Joined: ${jikan.joined}
⭐️ Anime Stats ⭐️
• Days Watched: ${jikan.anime_stats.days_watched}
• Mean Score: ${jikan.anime_stats.mean_score}
• Currently Watching: ${jikan.anime_stats.watching}
• Completed: ${jikan.anime_stats.completed}
• On Hold: ${jikan.anime_stats.on_hold}
• Dropped: ${jikan.anime_stats.dropped}
• Plan to Watch: ${jikan.anime_stats.plan_to_watch}
🎯️ Manga Stats 🎯️
• Days Read: ${jikan.manga_stats.days_read}
• Mean Score: ${jikan.manga_stats.mean_score}
• Currently Reading: ${jikan.manga_stats.reading}
• Completed: ${jikan.manga_stats.completed}
• On Hold: ${jikan.manga_stats.on_hold}
• Dropped: ${jikan.manga_stats.dropped}
• Plan to Read: ${jikan.manga_stats.plan_to_read}`

                await manik.sendFileFromUrl(from, `${jikan.image_url}`,`user.png`, Data)
                limitAdd(serial)
            } catch (err) {
                console.log(err)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
            }    
            break
        case prefix+'malanime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const keyword = message.body.replace('#malanime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            manik.sendImage(from, base64, title, content)
             await limitAdd(serial)
           } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        case prefix+'malcharacter':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const keywords = message.body.replace('#malcharacter', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            manik.sendImage(from, base64, name, contentt)
            await limitAdd(serial)
           } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        // PRAY //
        case prefix+'jadwalshalat':
        case prefix+'jadwalsholat':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `[❗] Kirim perintah *#jadwalShalat [ Daerah ]*\ncontoh : *#jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *#listDaerah*`)
            const daerah = body.slice(14)
            const jadwalShalat = await axios.get(`https://api.vhtear.com/jadwalsholat?query=${daerah}&apiKey=${vhtearkey}`)
            if (jadwalShalat.data.error) return manik.reply(from, jadwalShalat.data.error, id)
            const { Shubuh, Zduhur, Ashr, Magrib, Isya, kota } = await jadwalShalat.data
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `「 JADWAL SHALAT 」\n\nJadwal shalat di ${kota}, ${tgl}-${arrbulan[bln]}-${thn}\n\nSubuh : ${Shubuh}\nDzuhur : ${Zduhur}\nAshar : ${Ashr}\nMaghrib : ${Magrib}\nIsya : ${Isya}`
            await limitAdd(serial)
            break
        case prefix+'quran':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*#quran* [ Urutan Surat ]\nContoh :\n*#quran 1*`, id)
            const qura = `https://api.vhtear.com/quran?no=${args[1]}&apikey=${vhtearkey}`
            const quraan = await axios.get(qura)
            const quraann = quraan.data
            let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
            await manik.reply(from, `${hasqu}`, id).catch((e) => manik.reply(from, `*Terdapat kesalahan saat mencari surat ${args[1]}*`, id))
            await limitAdd(serial)
            break
        case prefix+'listsurah': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '*「 DAFTAR SURAH 」*\n\n___________________________\n'
                    let nmr = 1
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += nmr + '. ' +  monospace(response.data.data[i].name.transliteration.id.toLowerCase()) + '\n'
                        nmr++
                            }
                        hehex += '___________________________'
                    manik.reply(from, hehex, id)
                })
            } catch(err) {
                manik.reply(from, err, id)
            }
            break
        case prefix+'infosurah': // ARUGAZ
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return manik.reply(from, `Kirim perintah *#infosurah [ Nama Surah ]*\nContoh : *#infosurah al-fatihah*`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
                try {
                    var pesan = "*「 INFORMASI SURAH 」*\n\n___________________________\n\n"
                    pesan = pesan + "➸ *Nama* : "+ data[idx].name.transliteration.id + "\n" + "➸ *Asma* : " +data[idx].name.short+"\n"+"➸ *Arti* : "+data[idx].name.translation.id+"\n"+"➸ *Jumlah ayat* : "+data[idx].numberOfVerses+"\n"+"➸ *Nomor surah* : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"➸ *Keterangan* : "+data[idx].tafsir.id
                    pesan += '\n\n___________________________'
                    manik.reply(from, pesan, message.id)
                    limitAdd(serial)
                }catch{
                    manik.reply(from, 'Data tidak ditemukan, atau nama surah salah', id)
                }
            break
        case prefix+'tafsir': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return manik.reply(from, `Kirim perintah *#tafsir [ Nama Surah ] [ Ayat ]*\nContoh : *#tafsir al-fatihah 2*`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
            try{
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[2])
                    var {data} = responsih.data
                    pesan = ""
                    pesan = pesan + "*「 TAFSIR 」*\n\nTafsir Q.S. "+data.surah.name.transliteration.id+":"+args[2]+"\n\n"
                    pesan = pesan + data.text.arab + "\n\n"
                    pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                    pesan += '\n\n___________________________'
                    manik.reply(from, pesan, message.id)
                    limitAdd(serial)
                }
            }catch{
                manik.reply(from, 'Data tidak ditemukan, mungkin nama surah/ayat salah', id)
            }
            break
        // MEDIA //
        case prefix+'ytsearch':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}ytsearch [ Query ]*, Contoh : #ytsearch alan walker alone`)
            const ytsher = body.slice(10)
            manik.reply(from, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(ytsher)}&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*「 YOUTUBE SEARCH 」*\n\n*Hasil Pencarian : ${ytsher}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n• *Judul* : ${result[i].title}\n• *Ditonton* : ${result[i].views}\n• *Durasi* : ${result[i].duration}\n• *Channel* : ${result[i].channel}\n• *URL* : ${result[i].urlyt}\n`
                }
                await manik.sendFileFromUrl(from, result[0].image, 'thumbserc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    manik.sendText(ownerNumber, 'YT Search Error : ' + err)
            }
            break
        case prefix+'distance':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return manik.reply(from, `[❗] Kirim perintah *${prefix}distance [ Daerah1|Daerah2 ]*\ncontoh : *${prefix}distance Jakarta|Bandung*`)
                manik.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
                try {
                    const dfdc1 = arg.split('|')[0]
                    const dfdc2 = arg.split('|')[1]
                    const dfdcres = await axios.get('https://api.vhtear.com/distance?from='+dfdc1+'&to='+dfdc2+'&apikey='+vhtearkey)
                    const { result } = dfdcres.data
                    await manik.reply(from, `*「 DRIVING-FLYING DISTANCE 」*\n\n${result.data}`, id)
                    await limitAdd(serial)
                } catch (err) {
                    console.error(err.message)
                    await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Lokasi tidak ditemukan')
                    manik.sendText(ownerNumber, 'Distance Error : ' + err)
                }
                break
        case prefix+'shopee':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}shopee [ Query ]*, Contoh : *${prefix}shopee HP Samsul a20*`)
            const shopek = body.slice(8)
            manik.reply(from, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/shopee?query=${shopek}&count=5&apikey=${vhtearkey}`)
                const dataplay = dataplai.data.result
                 let shopeq = `*「 SHOPEE 」*\n\n*Hasil Pencarian : ${shopek}*\n`
                for (let i = 0; i < dataplay.items.length; i++) {
                    shopeq += `\n─────────────────\n\n• *Nama* : ${dataplay.items[i].nama}\n• Harga* : ${dataplay.items[i].harga}\n• *Terjual* : ${dataplay.items[i].terjual}\n• *Lokasi Toko* : ${dataplay.items[i].shop_location}\n• *Deskripsi* : ${dataplay.items[i].description}\n• *Link Product : ${dataplay.items[i].link_product}*\n`
                }
                await manik.sendFileFromUrl(from, dataplay.items[0].image_cover, `shopee.jpg`, shopeq, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
            }
            break
        case prefix+'playstore':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}playstore [ Query ]*, Contoh : *${prefix}playstore Mobile Legends*`)
            const keywotp = body.slice(11)
            manik.reply(from, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/playstore?query=${keywotp}&apikey=${vhtearkey}`)
                const dataplay = dataplai.data
                 let keluarplay = `*「 PLAYSTORE 」*\n\nHasil Pencarian : ${keywotp}*\n`
                for (let i = 0; i < dataplay.result.length; i++) {
                    keluarplay += `\n─────────────────\n\n• *Nama* : ${dataplay.result[i].title}\n• *Developer* : ${dataplay.result[i].developer}\n• *Deskripsi* : ${dataplay.result[i].description}\n• *Paket ID* : ${dataplay.result[i].app_id}\n• *Harga* : ${dataplay.result[i].price}\n• *Link App* : https://play.google.com${dataplay.result[i].url}\n`
                }
                await manik.sendFileFromUrl(from, dataplay.result[0].icon, `iconapk.webp`, keluarplay, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
            }
            break
        case prefix+'newstickerline':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            manik.reply(from, mess.wait, id)
            try {
                const stcline = await fetch(`https://api.vhtear.com/newsticker?apikey=${vhtearkey}`)
                if (!stcline.ok) throw new Error(`unexpected response ${stcline.statusText}`)
                const stcline2 = await stcline.json()
                const { hasil } = await stcline2.result
                let xixixi = `*「 NEW STICKER LINE 」*\n\n`
                for (let i = 0; i < hasil.length; i++) {
                    xixixi += `\n─────────────────\n\n*Title* : ${hasil[i].title}\n*Url* : ${hasil[i].uri}\n`
                }
                await manik.sendFileFromUrl(from, 'https://play-lh.googleusercontent.com/BkvRJsjYiEjb0-XKuop2AurqFKLhhu_iIP06TrCTGAq180P9Briv8Avz8ncLp7bOmCs', 'newstc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    manik.sendText(ownerNumber, 'Berita Error : ' + err)
            }
            break
        case prefix+'news':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            manik.reply(from, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/beritaterbaru&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonber = await response2.json()
                const { data } = await jsonber.result
                let xixixi = `*「 BERITA TERKINI 」*\n\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Source* : ${data[i].url}\n*Penulis* : ${data[i].author}\n*Judul* : ${data[i].title}\n*Deskripsi* : ${data[i].description}\n*Dipublikasi* : ${data[i].publishedAt}\n*Konten* : ${data[i].content}\n`
                }
                await manik.sendFileFromUrl(from, data[0].urlToImage, 'thumbserc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    manik.sendText(ownerNumber, 'Berita Error : ' + err)
            }
            break
        case prefix+'jadwalbola':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            manik.reply(from, mess.wait, id)
            try {
                const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${vhtearkey}`)
                if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
                const jdbola2 = await jdbola.json()
                const { data } = await jdbola2.result
                let xixixi = `*「 JADWAL BOLA 」*\n\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}`
                }
                await manik.sendText(from, xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
                    manik.sendText(ownerNumber, 'Jadwal Bola Error : ' + err)
            }
            break
        case prefix+'infogempa':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const bmkg = await axios.get('http://tobz-api.herokuapp.com/api/infogempa?apikey=' + tobzkey)
            const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
            const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
            manik.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            await limitAdd(serial)
            break
        case prefix+'ssphone':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#ssphone [linkWeb]*\nContoh : *#ssphone https://neonime.vip*', id)
            const ssphone = body.slice(9)
            manik.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${ssphone}&type=phone&apikey=${vhtearkey}`, 'ssphone.jpg', '', id)
            await limitAdd(serial)
            break
        case prefix+'sspc':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#sspc [linkWeb]*\nContoh : *#sspc https://neonime.vip*', id)
            const sspc = body.slice(6)
            manik.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${sspc}&type=pc&apikey=${vhtearkey}`, 'sspc.jpg', '', id)
            await limitAdd(serial)
            break
    case prefix+'bitly':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#bitly [linkWeb]*\nContoh : *#bitly https://neonime.vip*', id)
            const shorturl1 = body.slice(7)
            const bitly1 = await axios.get('https://tobz-api.herokuapp.com/api/bitly?url=' + shorturl1 + '&apikey=' + tobzkey)
            const bitly2 = bitly1.data
            if (bitly2.error) return manik.reply(from, bitly2.error, id)
            const surl2 = `Link : ${shorturl1}\nShort URL : ${bitly2.result}`
            manik.sendText(from, surl2, id)
            await limitAdd(serial)
            break
        case prefix+'tinyurl':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#shorturl [linkWeb]*\nContoh : *#shorturl https://neonime.vip*', id)
            const shorturl2 = body.slice(9)
            const tiny1 = await axios.get('https://tobz-api.herokuapp.com/api/shorturl?url=' + shorturl2 + '&apikey=' + tobzkey)
            const tiny2 = tiny1.data
            if (tiny2.error) return manik.reply(from, tiny2.error, id)
            const surl3 = `Link : ${shorturl2}\nShort URL : ${tiny2.result}`
            manik.sendText(from, surl3, id)
            await limitAdd(serial)
            break
        case prefix+'cuaca':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#cuaca [tempat]*\nContoh : *#cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await axios.get('http://melodicxt.herokuapp.com/api/cuaca?query='+ tempat +'&apiKey='+ melodickey)
            const weatherr = weather.data
            if (weatherr.error) {
                manik.reply(from, weatherr.error, id)
            } else {
                manik.reply(from, `➸ Tempat : ${weatherr.result.tempat}\n\n➸ Angin : ${weatherr.result.angin}\n➸ Cuaca : ${weatherr.result.cuaca}\n➸ Deskripsi : ${weatherr.result.desk}\n➸ Kelembapan : ${weatherr.result.kelembapan}\n➸ Suhu : ${weatherr.result.suhu}\n➸ Udara : ${weatherr.result.udara}`, id)
                limitAdd(serial)
            }
            break
        case prefix+'covid':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
            await manik.sendText(from, '🌎️ Covid Info - ' + country + ' 🌍️\n\n✨️ Total Cases: ' + `${cases}` + '\n📆️ Today\'s Cases: ' + `${todayCases}` + '\n☣️ Total Deaths: ' + `${deaths}` + '\n☢️ Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️ Active Cases: ' + `${active}` + '.')
            await limitAdd(serial)
            break
        case prefix+'spamcall':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & Admin bot', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam + '&apikey=' + tobzkey)
            const { logs } = call2.data
                await manik.sendText(from, `Logs : ${logs}` + '.')
            break
        case prefix+'ytmp4':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}ytmp4 [ Link Yt ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return manik.reply(from, mess.error.Iv, id)
            try {
                manik.reply(from, mess.wait, id)
                const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!ytvh.ok) throw new Error(`Error YTMP4 : ${ytvh.statusText}`)
                const ytvh2 = await ytvh.json()
                 if (ytvh2.status == false) {
                    manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(ytvh2.result.size.split(' MB')[0]) > 30.00) return manik.sendFileFromUrl(from, ytvh2.result.imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 30 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                    const { title, UrlVideo, imgUrl, size, status, ext } = await ytvh2.result
                    console.log(`VHTEAR : ${ext}\n${size}\n${status}`)
                    manik.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                    await manik.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                manik.sendText(ownerNumber, 'Error ytmp4 : '+ err)
                manik.reply(from, 'Jangan download video yang sama dengan sebelumnya!', id)
            }
            break
        case prefix+'play':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isAdmin) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh user premium manik!`, id)
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #ceklimit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return manik.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: #play judul lagu`, id)
            try {
                manik.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Play : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(webplay2.result.size.split(' MB')[0]) >= 10.00) return manik.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 10 MB!', id)
                    const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 PLAY 」*\n\n• *Judul* : ${title}\n• *Durasi* : ${duration}\n• *Filesize* : ${size}\n• *Exp* : ${ext}\n\n_*Music Sedang Dikirim*_`
                    manik.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                    await manik.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                manik.sendText(ownerNumber, 'Error Play : '+ err)
                manik.reply(from, 'Jangan meminta lagu yang sama dengan sebelumnya!', id)
            }
            break   
        case prefix+'ytmp3':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}ytmp3 [ Link Yt ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`, id)
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return manik.reply(from, mess.error.Iv, id)
            try {
                manik.reply(from, mess.wait, id)
                const vhtearyt3 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!vhtearyt3.ok) throw new Error(`Error YTMP3 : ${vhtearyt3.statusText}`)
                const vhtearyt33 = await vhtearyt3.json()
                 if (vhtearyt33.status == false) {
                    manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if(Number(vhtearyt33.result.size.split(' MB')[0]) >= 10.00) return manik.sendFileFromUrl(from, vhtearyt33.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${vhtearyt33.result.title}\n• *Filesize* : ${vhtearyt33.result.size}\n\n_Maaf, Durasi audio melebihi 10 MB. Silahkan download audio melalui link dibawah_.\n${vhtearyt33.result.UrlMp3}`, id)
                    const { title, ext, size, UrlMp3, status, imgUrl } = await vhtearyt33.result
                    console.log(`VhTear Giliran ${ext}\n${size}\n${status}`)
                    const captions = `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    manik.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    //await manik.sendFile(from, UrlMp3, `${title}.mp3`, '', id)
                    await manik.sendFileFromUrl(from, UrlMp3, `${title}.mp3`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                manik.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                manik.reply(from, 'Jangan download audio yang sama dengan sebelumnya!', id)
            }
            break
    case prefix+'moddroid':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#moddroid [query]*\nContoh : *#moddroid darling pubg*', id)
            try {
                const moddroid = await axios.get('https://tobz-api.herokuapp.com/api/moddroid?q=' + body.slice(10)  + '&apikey=' + tobzkey)
                if (moddroid.data.error) return manik.reply(from, moddroid.data.error, id)
                const modo = moddroid.data.result[0]
                const resmod = `• *Title* : ${modo.title}\n• *Publisher* : ${modo.publisher}\n• *Size* : ${modo.size}\n• *MOD Info* : ${modo.mod_info}\n• *Version* : ${modo.latest_version}\n• *Genre* : ${modo.genre}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                manik.sendFileFromUrl(from, modo.image, 'MODDROID.jpg', resmod, id)
                await limitAdd(serial)
            } catch (err) {
                console.log(err)
            }
            break
        case prefix+'happymod':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#happymod [query]*\nContoh : *#happymod darling pubg*', id)
            try {
                const happymod = await axios.get('https://tobz-api.herokuapp.com/api/happymod?q=' + body.slice(10)  + '&apikey=' + tobzkey)
                if (happymod.data.error) return manik.reply(from, happymod.data.error, id)
                const modo = happymod.data.result[0]
                const resmod = `• *Title* : ${modo.title}\n• *Purchase* : ${modo.purchase}\n• *Size* : ${modo.size}\n• *Root* : ${modo.root}\n• *Version* : ${modo.version}\n• *Price* : ${modo.price}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                manik.sendFileFromUrl(from, modo.image, 'HAPPYMOD.jpg', resmod, id)
                await limitAdd(serial)
            } catch (err) {
                console.log(err)
            }
            break
        case prefix+'google':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            manik.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return manik.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                manik.reply(from, vars, id);
                limitAdd(serial)
            }).catch(e => {
                console.log(e)
                manik.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
        case prefix+'translate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if(args[1] == undefined || args[2] == undefined) return
            if(args.length >= 2){
                var codelang = args[1]
                var textai = body.slice(11+codelang.length);
                translatte(textai, {to: codelang}).then(res => {
                    manik.sendText(from,res.text);
                    limitAdd(serial)
                }).catch(err => {
                     manik.sendText(from,`[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *${prefix}bahasa* untuk melihat list kode bahasa`);
                });
            }
            break
        case prefix+'nhentai':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#nhentai* [ Query ]')
            const quernh = body.slice(9)
            manik.reply(from, mess.wait, id)
            try {
                const resnh = await fetch(`https://api.vhtear.com/nhentaisearch?query=${encodeURIComponent(quernh)}&apikey=${vhtearkey}`)
                if (!resnh.ok) throw new Error(`unexpected response ${resnh.statusText}`)
                const jsonnh = await resnh.json()
                const { doujins } = await jsonnh.result
                let berhitung = 1
                let xixixi = `*「 NHENTAI 」*\n\n*Hasil Pencarian* : ${quernh}\n*Sort* : ${jsonnh.result.sort}\n*Total Pencarian* : ${jsonnh.result.totalResults}\n\n─────────────────\n\nKetik #getnhentai [ Angka ] untuk mengambil ID, Contoh : #getnhentai 2\n`
                for (let i = 0; i < doujins.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${doujins[i].title}\n*Bahasa* : ${doujins[i].lang}\n*Perintah download* : *#getnhentai ${doujins[i].id}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < doujins.length; ii++) {
                    xixixi += `(#)${doujins[ii].id}`
                }
                await manik.sendFileFromUrl(from, doujins[0].cover, 'thumbnh.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                manik.sendFileFromUrl(from, errorurl, 'error.png', '💔️ Maaf, Nhentai tidak ditemukan')
                manik.sendText(ownerNumber, 'Nhentai Error : ' + err)
            }
            break
        case prefix+'getnhentai':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *#getnhentai [ Id Download ]*, untuk contoh silahkan kirim perintah *#readme*`, id)
                    if (!Number(args[1])) return manik.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *#getnhentai 1*`, id)
                    const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = dataDownmp3.split('(#)')
                    console.log(pilur[args[1]])
                    manik.reply(from, mess.wait, id)
                    const vezasukadoujin = await fetch(`https://api.vhtear.com/nhentaidoujin?query=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!vezasukadoujin.ok) throw new Error(`Error barbaryt3 ${vezasukadoujin.statusText}`)
                    const doujinveza = await vezasukadoujin.json()
                    const nhppdf = await fetch(`https://api.vhtear.com/nhentaipdfdownload?query=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!nhppdf.ok) throw new Error(`Error barbaryt3 ${nhppdf.statusText}`)
                    const nhppdf2 = await nhppdf.json()
                    if (doujinveza.error) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { title, artists, categories, secondary_title, languages, images, tags, pages } = await doujinveza.result
                        console.log(`CHANGE API BARBAR : ${artists}\n${categories}\n${title}`)
                        const captions = `*「 NHENTAI DOWNLOADER 」*\n\n*Title* : ${title}\n*Secondary Title* : ${secondary_title}\n*Artist* : ${artists}\n*Categories* : ${categories}\n*Pages* : ${pages}\n*Languages* : ${languages}\n*Tags* : ${tags}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        manik.sendText(from, captions, id)
                        manik.sendFileFromUrl(from, nhppdf2.result.pdf_file, `${secondary_title}.pdf`,id)
                        limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    manik.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran nhentai.*`, id)
                } else {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *#getnhentai [ Id Download ]*, untuk contoh silahkan kirim perintah *#readme*`)
                    if (args[1] <= 25) return manik.reply(from, `*Apabila ingin mengambil data nhentai dengan nomor urutan, mohon tag pesan bot tentang pencarian nhentai!*`,)
                    manik.reply(from, mess.wait, id)
                    const vezasukadoujin = await fetch(`https://api.vhtear.com/nhentaidoujin?query=${args[1]}&apikey=${vhtearkey}`)
                    if (!vezasukadoujin.ok) throw new Error(`Error barbaryt3 ${vezasukadoujin.statusText}`)
                    const doujinveza = await vezasukadoujin.json()
                    const nhppdf = await fetch(`https://api.vhtear.com/nhentaipdfdownload?query=${args[1]}&apikey=${vhtearkey}`)
                    if (!nhppdf.ok) throw new Error(`Error barbaryt3 ${nhppdf.statusText}`)
                    const nhppdf2 = await nhppdf.json()
                    if (doujinveza.error) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        const { title, artists, categories, secondary_title, languages, images, tags, pages } = await doujinveza.result
                        console.log(`CHANGE API BARBAR : ${artists}\n${categories}\n${title}`)
                        const captions = `*「 NHENTAI DOWNLOADER 」*\n\n*Title* : ${title}\n*Secondary Title* : ${secondary_title}\n*Artist* : ${artists}\n*Categories* : ${categories}\n*Pages* : ${pages}\n*Languages* : ${languages}\n*Tags* : ${tags}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        manik.sendText(from, captions, id)
                        manik.sendFileFromUrl(from, nhppdf2.result.pdf_file, `${secondary_title}.pdf`,id)
                        limitAdd(serial)
                   }
                }
            } catch (err) {
                manik.reply(from, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case prefix+'xvideos':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isNsfw) return manik.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
        if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}xvideos* [ Judul ]`)
            const querVID = body.slice(9)
            manik.reply(from, mess.wait, id)
            try {
                const resvid = await fetch(`https://mnazria.herokuapp.com/api/porn?search=${encodeURIComponent(querVID)}`)
                if (!resvid.ok) throw new Error(`unexpected response ${resvid.statusText}`)
                const jsonserxvid = await resvid.json()
                const { result } = await jsonserxvid
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querVID}*\n\n─────────────────\n\nKetik #getxvideos [angka] untuk mengambil ID, Contoh : #getxvideos 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Actors* : ${result[i].actors}\n*Durasi* : ${result[i].duration}\n*Perintah download* : *${prefix}getxvideos ${result[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].url}`
                }
                await manik.sendFileFromUrl(from, result[0].image, 'thumbxvid.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                manik.sendFileFromUrl(from, errorurl, 'error.png', '💔️ Maaf, Xvideos tidak ditemukan')
                manik.sendText(ownerNumber, 'Xvideos Error : ' + err)
            }
            break
        case prefix+'getxvideos':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isNsfw) return manik.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
        if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                    if (!Number(args[1])) return manik.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *${prefix}getxvideos 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    manik.reply(from, mess.wait, id)
                    const vidxvid = await fetch(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`)
                    if (!vidxvid.ok) throw new Error(`Error Get Video : ${vidxvid.statusText}`)
                    const vidxvideo = await vidxvid.json()
                     if (vidxvideo.status == false) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { mp4 } = await vidxvideo
                        const shortvidxv = await urlShortener(mp4)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n*Ext* : MP3\n\n*Silahkan download file media sedang melalui link yang tersedia.*\n${shortvidxv}`
                        manik.sendFileFromUrl(from, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                        // await manik.sendFileFromUrl(from, result, `${title}.mp3`, `XVIDEOS BY manik`, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    manik.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran videp.*`, id)
                } else {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                    if (args[1] <= 25) return manik.reply(from, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian videp!*`,)
                    manik.reply(from, mess.wait, id)
                    const getvide = await get.get(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`).json
                    if (getvide.error) {
                        manik.reply(from, getvide.error, id)
                    } else {
                        const { mp4 } = await mhankyt35
                        const shortvidxv2 = await urlShortener(mp4)
                        console.log(`CHANGE API BARBAR : ${ext}\n${filesize}\n${status}`)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        manik.sendFileFromUrl(from, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                        // await manik.sendFileFromUrl(from, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                manik.sendText(ownerNumber, 'Error XVideos : '+ err)
                manik.reply(from, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case prefix+'xxx':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isNsfw) return manik.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
        if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}xxx* [ Judul ]`)
            const querXXX = body.slice(9)
            manik.reply(from, mess.wait, id)
            try {
                const resxxx = await fetch(`https://api.vhtear.com/xxxsearch?query=${encodeURIComponent(querXXX)}&apikey=${vhtearkey}`)
                if (!resxxx.ok) throw new Error(`unexpected response ${resxxx.statusText}`)
                const resxxx2 = await resxxx.json()
                const { data } = await resxxx2.result
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querXXX}*\n\n─────────────────\n\nKetik #getxxx [angka] untuk mengambil ID, Contoh : #getxxx 2\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${data[i].title}\n*Duration* : ${data[i].duration}\n*Perintah download* : *${prefix}getxxx ${data[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < data.length; ii++) {
                    xixixi += `(#)${data[ii].url}`
                }
                await manik.sendFileFromUrl(from, data[0].image, 'thumbxxx.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                manik.sendFileFromUrl(from, errorurl, 'error.png', '💔️ Maaf, XXX tidak ditemukan')
                manik.sendText(ownerNumber, 'XXX Error : ' + err)
            }
            break
        case prefix+'getxxx':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isNsfw) return manik.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
        if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getxxx [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                    if (!Number(args[1])) return manik.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *${prefix}getxxx 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    manik.reply(from, mess.wait, id)
                    const getxxx = await fetch(`https://api.vhtear.com/xxxdownload?link=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!getxxx.ok) throw new Error(`Error XXX : ${getxxx.statusText}`)
                    const getxxx2 = await getxxx.json()
                     if (getxxx2.status == false) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { title, urlVideo, response } = await getxxx2.result
                        console.log(`STATUS API : ${response}`)
                        let xixixi = `*「 XXX DOWNLOADER 」*\n\n${title}`
                        for (let i = 0; i < urlVideo.length; i++) {
                            xixixi += `\n─────────────────\n\n*Title* : ${urlVideo[i].title}\n*Default Quality* : ${urlVideo[i].defaultQuality}\n*Format* : ${urlVideo[i].format}\n*Quality* : ${urlVideo[i].quality}\n*Url Video* : ${urlVideo[i].videoUrl}\n\n`
                        }
                        const captions = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}\n\n*Ext* : MP4\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        manik.sendFileFromUrl(from, `https://thumbs.dreamstime.com/b/xxx-neon-sign-dark-background-xxx-neon-sign-dark-background-vector-illustration-129829099.jpg`, `xxx.jpg`, xixixi, id)
                        // await manik.sendFileFromUrl(from, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    manik.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran video.*`, id)
                } else {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getxxx [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                    if (args[1] <= 25) return manik.reply(from, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian video!*`,)
                    manik.reply(from, mess.wait, id)
                    const getxxx = await fetch(`https://api.vhtear.com/xxxsearch?link=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!getxxx.ok) throw new Error(`Error XXX : ${getxxx.statusText}`)
                    const getxxx2 = await getxxx.json()
                     if (getxxx2.status == false) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        //if (Number(getxxx2.result.data.duration.split(':')[0]) > 5) return manik.sendFileFromUrl(from, imgUrl, `thumb.jpg`, `*「 XXX DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`, id)
                        const { title, urlVideo, response } = await getxxx2.result
                        console.log(`STATUS API : ${response}`)
                        let xixixi = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}`
                        for (let i = 0; i < urlVideo.length; i++) {
                            xixixi += `\n─────────────────\n\n*Default Quality* : ${urlVideo[i].defaultQuality}\n*Format* : ${urlVideo[i].format}\n*Quality* : ${urlVideo[i].quality}\n*Url Video* : ${urlVideo[i].videoUrl}\n\n`
                        }
                        const captions = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}\n\n*Ext* : MP4\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        manik.sendFileFromUrl(from, `https://thumbs.dreamstime.com/b/xxx-neon-sign-dark-background-xxx-neon-sign-dark-background-vector-illustration-129829099.jpg`, `xxx.jpg`, xixixi, id)
                        // await manik.sendFileFromUrl(from, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                manik.sendText(ownerNumber, 'Error XVideos : '+ err)
                manik.reply(from, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case prefix+'video':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}video* [ Video ]`)
            const syt = body.slice(7)
            manik.reply(from, mess.wait, id)
            try {
                const linkytvid = await axios.get(`https://api.vhtear.com/youtube?query=${encodeURIComponent(syt)}&apikey=${vhtearkey}`)
                const { result } = await linkytvid.data
                let angkanya = 1
                let maniklod = `*「 YOUTUBE VIDEO 」*\n\n*Hasil Pencarian : ${syt}*\n\n─────────────────\n\nKetik #getvideo [angka] untuk mengambil ID, Contoh : #getvideo 2\n`
                for (let i = 0; i < result.length; i++) {
                    maniklod += `\n─────────────────\n\n*Urutan* : ${i+1}\n*Judul* : ${result[i].title}\n*Durasi* : ${result[i].duration}\n*Channel* : ${result[i].channel}\n*Perintah download* : #getvideo ${result[i].id}\n`
                }
                    maniklod += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    maniklod += `(#)${result[ii].id}`
                }
                await manik.sendFileFromUrl(from, result[0].image, 'tumbail.jpg', maniklod, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                manik.sendText(ownerNumber, 'Error Get Video : '+ err)
                manik.reply(from, mess.error.Yt4, id)
            }
            break
        case prefix+'getvideo':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getvideo* [ Id Download ], untuk contoh silahkan kirim perintah *${prefix}readme*`, id)
            try {    
            if (quotedMsg && quotedMsg.type == 'image') {
                if (!Number(args[1])) return manik.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *${prefix}getvideo 1*`, id)
                const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                const pilur = dataDownmp3.split('(#)')
                console.log(pilur[args[1]])
                manik.reply(from, mess.wait, id)
                const mhanky45 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${pilur[args[1]]}&apikey=${vhtearkey}`)
                if (!mhanky45.ok) throw new Error(`Error Get Video : ${mhanky45.statusText}`)
                const mhankyt45 = await mhanky45.json()
                if (mhankyt45.status == false) {
                    manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(mhankyt45.result.size.split(' MB')[0]) > 30.00) return manik.sendFileFromUrl(from, mhankyt45.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${mhankyt45.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt45.result.size}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_\n${UrlVideo}`, id)
                    const { title, ext, imgUrl, size, UrlVideo } = await mhankyt45.result
                    const captions = `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${size}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`                  
                    manik.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    await manik.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => manik.reply(from, mess.error.Yt3, id))
                    await limitAdd(serial)
                }
            } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    manik.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran video.*`, id)
            } else {
                if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getvideo [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                if (args[1] <= 25) return manik.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *${prefix}getvideo 1*`,)
                manik.reply(from, mess.wait, id)
                const mhanky45 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${args[1]}&apikey=${vhtearkey}`)
                if (!mhanky45.ok) throw new Error(`Error Get Video : ${mhanky45.statusText}`)
                const mhankyt45 = await mhanky45.json()
                if (mhankyt45.status == false) {
                    manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(mhankyt45.result.size.split(' MB')[0]) > 30.00) return manik.sendFileFromUrl(from, mhankyt45.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${mhankyt45.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt45.result.size}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_\n${UrlVideo}`, id)
                    const { title, ext, imgUrl, size, UrlVideo } = await mhankyt45.result
                    const captions = `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${size}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`                  
                    manik.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    await manik.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => manik.reply(from, mess.error.Yt3, id))
                    await limitAdd(serial)
                    }
                }
            } catch (err) {
                console.log(err)
                manik.sendText(ownerNumber, 'Error Get Video : '+ err)
                manik.reply(from, mess.error.Yt4, id)
            }
            break
        case prefix+'music':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
        if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}musik* [ Lagu ]`)
            const quer = body.slice(7)
            manik.reply(from, mess.wait, id)
            try {
                const resmus = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(quer)}&apikey=${vhtearkey}`)
                if (!resmus.ok) throw new Error(`unexpected response ${resmus.statusText}`)
                const jsonsercmu = await resmus.json()
                const { result } = await jsonsercmu
                let berhitung = 1
                let xixixi = `*「 YOUTUBE MUSIC 」*\n\n*Hasil Pencarian : ${quer}*\n\n─────────────────\n\nKetik #getmusik [ Angka ] untuk mengambil ID, Contoh : #getmusik 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Channel* : ${result[i].channel}\n*Durasi* : ${result[i].duration}\n*Perintah download* : *${prefix}getmusik ${result[i].id}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].id}`
                }
                await manik.sendFileFromUrl(from, result[0].image, 'thumbserc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                manik.sendFileFromUrl(from, errorurl, 'error.png', '💔️ Maaf, Music tidak ditemukan')
                manik.sendText(ownerNumber, 'Music Error : ' + err)
            }
            break
        case prefix+'getmusik':
        case prefix+'getmusic':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getmusik [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                    if (!Number(args[1])) return manik.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *${prefix}getmusik 1*`, id)
                    const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = dataDownmp3.split('(#)')
                    console.log(pilur[args[1]])
                    manik.reply(from, mess.wait, id)
                    const mhanky35 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!mhanky35.ok) throw new Error(`Error Get Video : ${mhanky35.statusText}`)
                    const mhankyt35 = await mhanky35.json()
                     if (mhankyt35.status == false) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        if (Number(mhankyt35.result.size.split(' MB')[0]) >= 10.00) return manik.sendFileFromUrl(from, mhankyt35.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*Title* : ${mhankyt35.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt35.result.size}\n\n*Untuk durasi lebih dari batas disajikan dalam bentuk link*\n${mhankyt35.result.UrlMp3}`, id)
                        const { title, ext, size, UrlMp3, status, imgUrl } = await mhankyt35.result
                        console.log(`CHANGE API BARBAR : ${ext}\n${size}\n${status}`)
                        const captions = `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        manik.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                        await manik.sendFileFromUrl(from, UrlMp3, `${title}.mp3`, `DOWNLOADER MUSIC BY manik`, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    manik.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran musik.*`, id)
                } else {
                    if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}getmusik [ Id Download ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
                    if (args[1] <= 25) return manik.reply(from, `*Apabila ingin mengambil data musik dengan nomor urutan, mohon tag pesan bot tentang pencarian musik!*`,)
                    manik.reply(from, mess.wait, id)
                    const mhanky35 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${args[1]}&apikey=${vhtearkey}`)
                    if (!mhanky35.ok) throw new Error(`Error Get Video : ${mhanky35.statusText}`)
                    const mhankyt35 = await mhanky35.json()
                     if (mhankyt35.status == false) {
                        manik.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(mhankyt35.result.size.split(' MB')[0]) >= 10.00) return manik.sendFileFromUrl(from, mhankyt35.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*Title* : ${mhankyt35.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt35.result.size}\n\n*Untuk durasi lebih dari batas disajikan dalam bentuk link*\n${mhankyt35.result.UrlMp3}`, id)
                        const { title, ext, size, UrlMp3, status, imgUrl } = await mhankyt35.result
                        console.log(`CHANGE API BARBAR : ${ext}\n${size}\n${status}`)
                        const captions = `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        manik.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                        await manik.sendFileFromUrl(from, UrlMp3, `${title}.mp3`, `DOWNLOADER MUSIC BY manik`, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                manik.sendText(ownerNumber, 'Error Get Music : '+ err)
                manik.reply(from, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case prefix+'gdrive':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const regex = new RegExp("\/d\/(.+)\/", 'gi')
            if (!args[1].match(regex)) { await manik.reply(from, `Url Google Drive Yang Kamu Masukkan Salah!\nContoh : #gdrive https://drive.google.com/file/d/1Cd8KjB9-cUU_Jy8Q/view`, id) }
                const urla = args[1]
                const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                function niceBytes(x){
                    let l = 0, n = parseInt(x, 10) || 0;
                    while(n >= 1024 && ++l){
                        n = n/1024;
                    }
                    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
                }
                const m = urla.match(regex)
                const fileid = m.toString().trimStart('/', 'd').trim('/');
                const linke = 'https://drive.google.com/file' + fileid + 'view?usp=sharing'
                fetch('https://gdbypass.host/api/?link='+linke)
                    .then((res) => {
                        status = res.status
                        return res.json()
                    })
                    .then(async(body) => {
                        const fileName = body.data.Filename
                        const size = body.data.Filesize
                        const newLink = body.data.NewUnlimitedURL
                        const ling = await urlShortener(newLink)
                            manik.reply(from, `*「 GOOGLE DRIVE 」*\n\n• *Nama File :* ${fileName}\n*• File Size :* ${niceBytes(size)}\n*• Short Link :* ${ling}`, id)
                            limitAdd(serial)
                    })
                    .catch((err) => {
                        manik.reply(from, `Maaf, Sepertinya Link Tidak Berhasil Di Bypass\n` + err, id)
                    })
            break
        case prefix+'xnxx':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#xnxx [linkXnxx]*, untuk contoh silahkan kirim perintah *#readme*')
            if (!args[1].match(isUrl) && !args[1].includes('xnxx.com')) return manik.reply(from, mess.error.Iv, id)
            try {
                manik.reply(from, mess.wait, id)
                const resq = await axios.get('http://melodicxt.herokuapp.com/api/xnxx-downloader?url='+ args[1] +'&apiKey='+ melodickey)
                const resp = resq.data
                 if (resp.error) {
                    manik.reply(from, ytvv.error, id)
                } else {
                    if (Number(resp.result.size.split(' MB')[0]) > 20.00) return manik.reply(from, 'Maaf durasi video sudah melebihi batas maksimal 20 menit!', id)
                    manik.sendFileFromUrl(from, resp.result.thumb, 'thumb.jpg', `➸ *Judul* : ${resp.result.judul}\n➸ *Deskripsi* : ${resp.result.desc}\n➸ *Filesize* : ${resp.result.size}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await manik.sendFileFromUrl(from, resp.result.vid, `${resp.result.title}.mp4`, '', id)}
                    await limitAdd(serial)
            } catch (err) {
                console.log(err)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                manik.sendText(ownerNumber, 'Xnxx Error : ' + err)
            }
            break
        case prefix+'ramalpasangan':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#ramalpasangan [kamu|pasangan]*\nContoh : *#ramalpasangan manik|manik*', id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
            manik.reply(from, mess.wait, id)
            const kamu = argz[0]
            const pacar = argz[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
            manik.reply(from, rjh2, id)
            limitAdd(serial)
            } else {
            await manik.reply(from, 'Wrong Format!', id)
            }
            break
        case prefix+'artinama':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
                if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}artinama [ Query ]*\nContoh : *${prefix}artinama manik*`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artinama?nama=' + body.slice(9) + '&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `*「 ARTI NAMA 」*\n\n• Artinama : ${resp.data.result.hasil}`
            manik.reply(from, anm2, id)
            await limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                manik.sendText(ownerNumber, 'Artinama Error : ' + err)
           }
            break
        case prefix+'zodiak':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#zodiak [zodiak kamu]*\nContoh : *#zodiak scorpio*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/zodiak?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `➸ Zodiak : ${resp.data.result.zodiak}\n➸ Ramalan : ${resp.data.result.ramalan}\n➸ Nomor Keberuntungan : ${resp.data.result.nomorKeberuntungan}\n➸ Motivasi : ${resp.data.result.motivasi}\n➸ Inspirasi : ${resp.data.result.inspirasi}`
            manik.reply(from, anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Zodiak tidak ditemukan')
                manik.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
        case prefix+'caklontong':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n➸ Deskripsi : ${resp.data.result.desk}\n➸ Poin : ${resp.data.result.poin}`
            manik.reply(from, anm2, id)
            manik.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            manik.reply(from, jwban, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                manik.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
           case prefix+'tebakgambar2':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
           const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            manik.sendFileFromUrl(from, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
            manik.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            manik.setGroupToAdminsOnly(groupId, true)
            manik.sendText(from, `Group telah ditutup. waktu menjawab telah habis, berikut adalah jawaban yang benar`, id)
            await sleep(2000)
            manik.reply(from, jwban, id)
            await sleep (5000)
            manik.sendText(from, `Group akan dibuka kembali otomatis setelah 3 detik`, id)
            await sleep(3000)
            manik.setGroupToAdminsOnly(groupId, false)
            manik.sendText(from, `Group telah dibuka, Untuk memulai kuis lagi, silahkan minta admin group`, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                manik.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
           }
           break
           case prefix+'reqfitur':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return manik.reply(from, '[❗] Kirim perintah *#reqfitur [teks]*\ncontoh : *#reqfitur Permisi Owner, mau request fitur , Tolong tolong diisi ya*')
            const req = body.slice(10)
            if(!req) return
            if(isGroupMsg){
                manik.sendText(ownerNumber, `*[REQ FITUR]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${req}`)
                manik.reply(from, 'Request telah diberikan ke owner BOT, request main2 tidak akan ditanggapi dan akan di ban.' ,id)
            }else{
                manik.sendText(ownerNumber, `*[REQ FITUR]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${req}`)
                manik.reply(from, 'Request telah diberikan ke owner BOT, request main2 tidak akan ditanggapi dan akan di ban.', id)
            }
            break
         case prefix+'tebakgambar':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            manik.sendFileFromUrl(from, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
            manik.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            manik.reply(from, jwban, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                manik.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
           }
           break
         case prefix+'family100':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            manik.reply(from, anm2, id)
            manik.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            manik.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            manik.reply(from, jwban, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                manik.sendText(ownerNumber, 'Family100 Error : ' + err)
           }
           break
        case prefix+'heroml':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#heroml [nama hero]*\nContoh : *#heroml akai*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/herodetail?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}`
            manik.sendFileFromUrl(from, resp.data.result.pictHero, 'hero.jpg', anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                manik.sendText(ownerNumber, 'Heroml Error : ' + err)
           }
            break
        case prefix+'nomorhoki':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#nomorhoki [no hp kamu]*\nContoh : *#nomorhoki 0895384009405*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/nomerhoki?no=' + body.slice(11) + '&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `➸ Hasil :\n ${resp.data.result.hasil}`
            manik.reply(from, anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Nomor Hoki tidak ditemukan')
                manik.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
           }
            break
        case prefix+'artimimpi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#artimimpi [mimpi]*\nContoh : *#artimimpi ular*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artimimpi?query=' + body.slice(10) + '&apikey=' + vhtearkey)
            if (resp.data.error) return manik.reply(from, resp.data.error, id)
            const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}`
            manik.reply(from, anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan')
                manik.sendText(ownerNumber, 'Artimimpi Error : ' + err)
           }
            break
        case prefix+'wiki':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#wiki [ Query ]*\nContoh : *#wiki asu*`, id)
            const queryz_ = body.slice(6)
            const wiki = await axios.get(`https://api.vhtear.com/wikipedia?query=${queryz_}&apikey=${vhtearkey}`)
            if (wiki.data.error) {
                manik.reply(from, wiki.data.error, id)
            } else {
                manik.sendFileFromUrl(from, wiki.data.result.ImgResult, '', `*「 WIKI 」*\n\n➸ *Query* : ${queryz_}\n\n➸ *Result* : ${wiki.data.result.Info}`, id)
                await limitAdd(serial)
            }
        break
        case prefix+'kbbi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#kbbi [ Query ]*\nContoh : *#kbbi asu*`, id)
            const kbbl = body.slice(6)
            const kbbl2 = await axios.get(`https://api.vhtear.com/kbbi?query=${kbbl}&apikey=${vhtearkey}`)

            if (kbbl2.data.error) {
                manik.reply(from, kbbl2.data.error, id)
            } else {
                manik.sendText(from, `*「 KBBI 」*\n\n➸ *Query* : ${kbbl}\n\n➸ *Result* : ${kbbl2.data.result.hasil}`, id)
                await limitAdd(serial)
            }
            break
        case prefix+'googleimage':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
            const qwery = argz[1]
            const jum = argz[2]
            if(!qwery) return await manik.reply(from, `Kirim perintah *#googleimage [ |Query|Jumlah ]*, contoh = #googleimage |loli|3`, id)
            if(!jum) return await manik.reply(from, `Jumlah gambar diperlukan, contoh = #googleimage |loli|3`, id)
            if(jum >= 5) return await manik.reply(from, 'Jumlah terlalu banyak! Max 4', id)
            var gis = require('g-i-s');
            var opts = {
                searchTerm: qwery
                };
                gis(opts, logResults);
                    
                function logResults(error, results) {
                    if (error) {
                        manik.reply(from, 'Maaf, Fitur Sedang Error', id)
                    } else {
                        const item = results.slice(0, jum)
                        item.forEach(async(res) => {
                        console.log(res)
                        const yurl = await urlShortener(res.url)
                        manik.sendImage(from, res.url, null, `➸ Link : ${yurl}\n➸ Image size : ${res.height} x ${res.width}`)  
                        limitAdd(serial) 
                        })
                    }
                }
            }
            break
        case prefix+'sandwriting': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return manik.reply(from, 'Kirim perintah *#sandwriting [ Teks ]*\nContoh *#sandwriting manik Cantik*', id)
            const swrt = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*

*Text : ${swrt}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, swrt3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Sand Writing Error : ' + err)
           }
          break
         case prefix+'tahta':
             if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             const jreng = body.slice(7)
             if (!jreng) return manik.reply(from, 'Kirim perintah *#tahta [teks]*\n\nContoh *#tahta manik*', id)
             if (jreng.length > 7) return manik.reply(from, 'Maksimal 7 Huruf!', id)
             manik.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
             await manik.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${jreng}&apikey=${vhtearkey}`,`${jreng}.jpg`,`Harta Tahta ${jreng}`, id)        
             await limitAdd(serial)
             break
             case prefix+'harrypotter':
             if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                const crod = body.slice(13)
                if (!crod) return manik.reply(from, 'Kirim perintah *#harrypotter [teks]*\n\nContoh *#harrypotter MANIK*', id)
                if (crod.length > 12) return manik.reply(from, 'Maksimal 12 Huruf!', id)
                manik.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/photooxy1/harrypotter?apikey=WEMPYGANSS&text=${crod}`,`${crod}.jpg`,`Hallypottel ${crod}`, id)        
                await limitAdd(serial)
             break
             case prefix+'halloween':
             if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
          const ween = body.slice(11)
                if (!ween) return manik.reply(from, 'Kirim perintah *#halooween [teks]*\n\nContoh *#halloween MANIK*', id)
                if (ween.length > 12) return manik.reply(from, 'Maksimal 12 Huruf!', id)
                manik.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://api.xteam.xyz/textpro/helloweenfire?text=${ween}&APIKEY=DhimasApiFree`,`${ween}.jpg`,`Hallypottel ${ween}`, id)        
                await limitAdd(serial)
             break
        case prefix+'resepmasakan':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return manik.reply(from, 'Kirim perintah *#resepmasakan [optional]*\nContoh *#resepmasakan rawon*', id)
            argz= body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const rmk = await slicedArgs.join(' ')
            console.log(rmk)
            try {
            const resp = await axios.get('https://api.vhtear.com/resepmasakan?query=' + rmk + '&apikey=' + vhtearkey)
            const { bahan, cara, image, title  } = resp.data.result
            const rmk3 = `*Resep Ditemukan!*
➸ *Judul:* ${title}
➸ *Bahan:* ${bahan}
➸ *Cara:* ${cara}`

            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, title, rmk3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
             manik.sendText(ownerNumber, 'Resepmasakan Error : ' + err)
           }
           break
        case prefix+'twitterstalk':
        case prefix+'twtstalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return manik.reply(from, 'Kirim perintah *#twtstalk @username*\nContoh *#twtstalk @miakhalifah*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twstalk = await slicedArgs.join(' ')
            console.log(twstalk)
            try {
            const twstalk2 = await axios.get('http://melodicxt.herokuapp.com/api/twtprofile?user=' + twstalk + '&apiKey=' + melodickey)
            const { created_at, user } = twt.result[0]
        const twtz = `*「 TWITTER PROFILE 」*

• *Username:* @${user.screen_name}
• *Nama:* ${user.name}
• *Deskripsi:* ${user.description}
• *Pengikut:* ${user.followers_count}
• *Mengikuti*: ${user.friends_count}
• *Jumlah Favorite:* ${user.favourites_count}
• *Jumlah Status:* ${user.statuses_count}
• *Dibuat:* ${created_at}
• *Link:* https://twitter.com/${user.screen_name}`

            const pictk = await bent("buffer")(user.profile_image_url)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, name, twtz)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Twitter Error : ' + err)
           }
          break
        case prefix+'igstalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return manik.reply(from, 'Kirim perintah *#igstalk @username*\nContoh *#igstalk duar_amjay*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
            const istalk2 = await axios.get('https://api.vhtear.com/igprofile?query=' + istalk + '&apikey=' + vhtearkey)
            const { username, biography, follow, follower, full_name, picture, post_count, is_private } = istalk2.result
        const istalk3 = `*「 INSTAGRAM PROFILE 」*

• *Username:* @${username}
• *Nama:* ${full_name}
• *Deskripsi:* ${biography}
• *Pengikut:* ${follower}
• *Mengikuti*: ${follow}
• *Jumlah Postingan:* ${post_count}
• *Private:* ${is_private}
• *Link:* https://instagram.com/${username}`
            
            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, username, istalk3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Igstalk Error : ' + err)
           }
          break
        case prefix+'tiktokstalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return manik.reply(from, 'Kirim perintah *#tiktokstalk @username*\nContoh *#tiktokstalk @duar_amjay*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const tstalk = await slicedArgs.join(' ')
            console.log(tstalk)
            try {
            const tstalk2 = await axios.get('https://api.vhtear.com/tiktokprofile?query=' + tstalk + '&apikey=' + vhtearkey)
            const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
            const tiktod = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Judul:* ${title}
➸ *Bio:* ${bio}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Like*: ${like_count}
➸ *Jumlah Postingan:* ${video_post}
➸ *Deskripsi:* ${description}
➸ *Link:* ${url_account}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, title, tiktod)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Error Tiktokstalk : '+ err)
           }
          break
        case prefix+'smulestalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#smulestalk [@username]*\nContoh : *#smulestalk loli*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sstalk = await slicedArgs.join(' ')
            console.log(sstalk)
            try {
            const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=' + sstalk + '&apikey=' + vhtearkey)
            const { username, full_name, follower, follow, biography, is_vip, picture, recording } = sstalk2.data.result
            const smule = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Full Name:* ${title}
➸ *Biografi:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *VIP*: ${is_vip}
➸ *Total Rekaman:* ${recording}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, title, smule)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Error Smulestalk : '+ err)
            }
          break
        case prefix+'':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isSimi) return manik.reply(from, 'command/Perintah Simi belum di aktifkan di group ini!', id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *# [teks]*\nContoh : *# halo*')
            const que = body.slice(2)
            const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
            const sigot = sigo.data
            manik.reply(from, sigot.success, id)
            console.log(sigot)
            break
        case prefix+'ig': 
        case prefix+'instagram':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#ig [ Link Instagram ]* untuk contoh silahkan kirim perintah *#readme*`)
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return manik.reply(from, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
            await manik.reply(from, mess.wait, id);
            instagram(args[1]).then(async(res) => {
                for (let i = 0; i < res.result.result.length; i++) {
            if (res.result.result[i].includes('.mp4')) {
                        var ext = '.mp4'
                    } else {
                        var ext = '.jpg'
                    }
            manik.sendFileFromUrl(from, res.result.result[i], `ig.${ext}`, `*「 INSTAGRAM 」*`, id);
                    limitAdd(serial)
                }
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'fb':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#fb [ Link Fb ]*\nContoh : *#fb https://www.facebook.com/24609282673/posts/10158628585367674/*`, id)
            manik.reply(from, mess.wait, id)
            facebook(args[1]).then(async(res) => {
                let { VideoUrl } = await res
                const epbe2 = `*「 FACEBOOK DOWNLOADER 」*\n➸ *Aplikasi*: Facebook\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                manik.sendFileFromUrl(from, VideoUrl, `Facebook.mp4`, epbe2, id)
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'waktu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            await manik.sendText(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            await limitAdd(serial)
            break
        case prefix+'tiktok':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#tiktok [linkTiktok]*\nContoh : *#tiktok https://vt.tiktok.com/yqyjPX/*', id)
            manik.reply(from, mess.wait, id)
            tiktok(args[1]).then(async(res) => {
                let { video, title, image, desk, dibuat, duration } = await res
                let ttiktok = `*「 TIKTOK DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ Deskripsi : ${desk}\n➸ Durasi : ${duration}\n➸ Dibuat : ${dibuat}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                manik.sendFileFromUrl(from, image, 'thumb.jpg', ttiktok, id)
                await manik.sendFileFromUrl(from, video, `${title}.mp4`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'smule':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#smule [linkSmule]*\nContoh : *#smule https://www.smule.com/p/767512225_3062360163*', id)
            manik.reply(from, mess.wait, id)
            smule(args[1]).then(async(res) => {
                let { Type, title, url, image } = await res
                let tsmule = `*「 SMULE DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Type:* ${Type}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                manik.sendFileFromUrl(from, image, 'thumb.jpg', tsmule, id)
                await manik.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'starmaker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *#readme*')
            manik.reply(from, mess.wait, id)
            starmaker(args[1]).then(async(res) => {
                let { image, desc, url, title } = await res
                let tstarmaker = `*「 STARMAKER DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Deskripsi:* ${desc}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                manik.sendFileFromUrl(from, image, 'thumb.jpg', tstarmaker, id)
                await manik.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'twitter':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#twitter [ Link Twitter ]* untuk contoh silahkan kirim perintah *#readme*`)
            manik.reply(from, mess.wait, id)
            twitter(args[1]).then(async(res) => {
                let { desk, urlVideo } = await res
                let ttwitter = `*「 TWITTER DOWNLOADER 」*\n\n➸ *Aplikasi:* Twitter\n➸ *Deskripsi:* ${desk}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                await manik.sendFileFromUrl(from, urlVideo, `twit.mp3`, ttwitter, id).catch(() => manik.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'maps':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#maps [optional]*, Contoh : *#maps Jakarta*')
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const mapz = await slicedArgs.join(' ')
            console.log(mapz)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
        case prefix+'joox':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            manik.reply(from, mess.wait, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *#joox [ Optional ]*\nContoh : *#joox Alan Walker*`, id)
            manik.reply(from, mess.wait, id)
            joox(args[1]).then(async(res) => {
                let { penyanyi, judul, album, linkImg, linkMp3, filesize, ext, duration } = await res
                let tjoox = `*「 JOOX DOWNLOADER 」*\n\n➸ *Penyanyi:* ${penyanyi}\n➸ *Judul:* ${judul}\n➸ *Album:* ${album}\n➸ *Ext:* ${ext}\n➸ *Size:* ${filesize}\n➸ *Durasi:* ${duration}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                manik.sendImage(from, linkImg, judul, tjoox)
                manik.sendFileFromUrl(from, linkMp3, `${judul}.${ext}`, '', id).catch(() => manik.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                manik.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'checkip':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#checkip [ipaddress]*\nContoh : *#checkip 182.0.144.145*', id)
            manik.reply(from, mess.wait, id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*User Ditemukan!*

➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            manik.sendImage(from, base64, city, cekip3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await manik.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             manik.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
        /*case prefix+'nhentai':
        case prefix+'nh':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                manik.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            manik.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then(() => 
                            manik.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            manik.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)
                            })
                    } catch (err) {
                        manik.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    manik.reply(from, '[❗] Kode nuklir Salah!')
                }
            } else {
                manik.reply(from, '[ WRONG ] Kirim perintah *#nhentai [kode]* untuk contoh kirim perintah *#readme*')
            }
            break*/
        case prefix+'brainly':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return manik.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                manik.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            manik.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                            limitAdd(serial)
                        } else {
                            manik.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                            limitAdd(serial)
                        }
                    })
                })
            } else {
                manik.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break
        case prefix+'math':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, '[❗] Kirim perintah *#math [ Angka ]*\nContoh : #math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            manik.reply(from, `"${mtk}", bukan angka!\n[❗] Kirim perintah *#math [ Angka ]*\nContoh : #math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
            limitAdd(serial)
        } else {
            manik.reply(from, `*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
        case prefix+'wait':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                manik.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        manik.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *Ecchi* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    manik.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        manik.reply(from, teks, id)
                        limitAdd(serial)
                    })
                })
                .catch(() => {
                    manik.reply(from, 'Error !', id)
                })
            } else {
                manik.sendFileFromUrl(from, tutor, 'Tutor.jpg', 'Neh contoh mhank!', id)
            }
            break
        case prefix+'textmaker':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                argz = body.trim().split('|')
                manik.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                if ((isMedia || isQuotedImage) && argz.length >= 2) {
                const top = argz[1]
                const bott = argz[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bott)
                await manik.sendFile(from, ImageBase64, 'image.png','neh...')
                await limitAdd(serial)
                } else {
                await manik.reply(from, 'Wrong Format!', id)
                }
                break
        case prefix+'quotemaker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split('|')
            if (argz.length >= 4) {
                manik.reply(from, mess.wait, id)
                const quotes = argz[1]
                const author = argz[2]
                const theme = argz[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    limitAdd(serial)
                    manik.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       manik.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                manik.reply(from, 'Usage: \n#quotemaker |teks|watermark|theme\n\nEx :\n#quotemaker |ini contoh|bicit|random', id)
            }
            break
        case prefix+'listchannel':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            manik.reply(from, listChannel, id)
            break
        case prefix+'jadwaltv':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            manik.reply(from, jadwal, id)
            break
        case prefix+'jadwaltvnow':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const jadwalNow = await axios.get('http://melodicxt.herokuapp.com/api/jadwaltvnow?apiKey='+melodickey)
            manik.reply(from, `Jam : ${jadwalNow.data.jam}\n\nJadwalTV : ${jadwalNow.data.jadwalTV}`, id)
            break
        case prefix+'nulis':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#nulis [teks]*, contoh *#nulis aku bukan boneka*', id)
            const ngettik = body.slice(7)
            const ngetikk = await axios.get('http://melodicxt.herokuapp.com/api/joki-nulis?text='+ ngettik+'&apiKey='+ melodickey)
            if (ngetikk.data.error) return manik.reply(from, ngetikk.data.error, id)
            manik.sendFileFromUrl(from, ngetikk.data.result, 'nulis.jpg', '', id)
            await limitAdd(serial)
            break
        case prefix+'inu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            manik.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            await limitAdd(serial)
            break
        case prefix+'qrcode':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if(!args.lenght >= 2) return
            let qrcodes = body.slice(8)
            await manik.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
            await limitAdd(serial)
            break
        case prefix+'ptl':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            manik.sendFileFromUrl(from, pep, 'pptl.jpg', 'Follow ig : https://www.instagram.com/ptl_repost untuk mendapatkan penyegar timeline lebih banyak', message.id)
            await limitAdd(serial)
            break
        case prefix+'neko':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            manik.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            await limitAdd(serial)
            break
        case prefix+'pokemon':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            q7 = Math.floor(Math.random() * 890) + 1;
            manik.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            await limitAdd(serial)
            break
        case prefix+'quote':
        case prefix+'quotes':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes?apikey=' + tobzkey)
            manik.reply(from, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
            await limitAdd(serial)
            break
        case prefix+'lirik':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return manik.reply(from, 'Kirim perintah *#lirik [optional]*, contoh *#lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            manik.reply(from, lirik, id)
            await limitAdd(serial)
            break
        case prefix+'chord':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return manik.reply(from, 'Kirim perintah *#chord [query]*, contoh *#chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await axios.get('https://tobz-api.herokuapp.com/api/chord?q='+ query__+'&apikey='+tobzkey)
            if (chord.data.error) return manik.reply(from, chord.data.error, id)
            manik.reply(from, chord.data.result, id)
            await limitAdd(serial)
            break
        case prefix+'listdaerah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const listDaerah = await axios.get('https://tobz-api.herokuapp.com/api/daerah?apikey='+tobzkey)
            manik.reply(from, listDaerah.data.result, id)
            await limitAdd(serial)
            break
        case prefix+'slap':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const slap = arg.split(' ')[0]
            const person = author.replace('@c.us', '')
            await manik.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            manik.sendTextWithMentions(from, '@' + person + ' *slapped* ' + slap)
            limitAdd(serial)
            break
        case prefix+'cerpen': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const cerpen = await get.get('https://arugaz.herokuapp.com/api/cerpen').json()
            manik.reply(from, `• *Cerpen*: ${cerpen.result}`, id)
            break
        case prefix+'puisi': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const puisi = await get.get('https://arugaz.herokuapp.com/api/puisi1').json()
            manik.reply(from, `• *Puisi*: ${puisi.result}`, id)
            break
        case prefix+'puisi2': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi2 = await get.get('https://arugaz.herokuapp.com/api/puisi2').json()
            manik.reply(from, `• *Puisi*: ${puisi2.result}`, id)
            break
        case prefix+'puisi3': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi3 = await get.get('https://arugaz.herokuapp.com/api/puisi3').json()
            manik.reply(from, `• *Puisi*: ${puisi3.result}`, id)
            break
        // ADMIN & OWNER
        case 'cekprefix':
            manik.reply(from, `PREFIX YANG SAAT INI DIGUNAKAN *「* ${prefix} *」*`)
            break
        case prefix+'setprefix':
            if(!isOwner) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner manik!`, id)
            if (args.length === 1) return manik.reply(from, `Kirim perintah *${prefix}prefix [ NEW PREFIX ]*`, id)
            prefix = args[1]
            manik.sendText(from, `Berhasil Mengganti Prefix Ke *「* ${prefix} *」*`)
            break
        case prefix+'addbadword':
            if (!isAdmin) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh user premium manik!`, id)
            if (!args.length >= 1) return manik.reply(from, `Masukkan kata kasar yang akan di blacklist `, id) 
            const word = body.slice(12)
            var cek = dbbadword.includes(word);
            if(cek){
                return manik.reply(from, `Badword Sudah Ada Di Database`, id)
            } else { 
                dbbadword.push(word)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                manik.reply(from, `Success Menambahkan Blacklist Badword\nTotal Data Badword Sekarang : *${dbbadword.length - 1}*`, id)
            }
            break
        case prefix+'delbadword':
            if (!isOwner) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner manik!`, id)
                const delbd = dbbadword.indexOf(body.slice(12))
                dbbadword.splice(delbd, 1)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                manik.reply(from, `Success Menghapus Badword!`, id)
            break
        case prefix+'listbadword':
            if (!isAdmin) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh premium manik!`, id)
                const bad = fs.readFileSync('./lib/database/katakasar.json')
                const liste = JSON.parse(bad)
                let listz = '*「 LIST BADWORD 」*\n'
                listz += `*Total : ${liste.length}*\n`
                let nomre = 1
                     for (let i = 0; i < liste.length; i++){
                        listz += `\n*${nomre}.* ${liste[i]}`
                        nomre++
                    }
                    manik.sendText(from, listz) 
                    break
        case prefix+'bc': // KASIH CREDIT DONG KALO COPAS
            if (!isOwner) return manik.reply(from, `Perintah ini hanya untuk Owner manik`, id)
                bctxt = body.slice(4)
                txtbc = `*「 MANIK BROADCAST 」*\n\n${bctxt}`
                const semuagrup = await manik.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await manik.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) manik.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    manik.reply('Broadcast sukses!')
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await manik.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) manik.sendText(grupnya, txtbc)
                    }
                            manik.reply('Broadcast Success!')
                }
                break
        case prefix+'adminlist':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await manik.sendTextWithMentions(from, mimin)
            break
        case prefix+'ownergroup':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await manik.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case prefix+'otagall': // FOR OWNER & ADMIN manik
        case prefix+'omentionall':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id)
            const groupMek = await manik.getGroupMembers(groupId)
            let heho = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMek.length; i++) {
                heho += '╠➥'
                heho += ` @${groupMek[i].id.replace(/@c.us/g, '')}\n`
            }
            heho += '╚═〘 MANIK BOT 〙'
            await sleep(2000)
            await manik.sendTextWithMentions(from, heho)
            break
        case prefix+'tagall': // FOR GROUP ADMINS
        case prefix+'mentionall':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await manik.getGroupMembers(groupId)
            let hehe = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➥'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 MANIK  BOT 〙'
            await sleep(2000)
            await manik.sendTextWithMentions(from, hehe)
            break
        case prefix+'ekickall':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await manik.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (ownerNumber.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await manik.removeParticipant(groupId, allMem[i].id)
                }
            }
            manik.reply(from, 'Success kick all member', id)
            break
        case prefix+'okickall':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner & premium $ special manik', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMeq = await manik.getGroupMembers(groupId)
            for (let i = 0; i < allMeq.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMeq[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await manik.removeParticipant(groupId, allMeq[i].id)
                }
            }
            manik.reply(from, 'Succes kick all member', id)
            break
        case prefix+'kickall':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMek = await manik.getGroupMembers(groupId)
            for (let i = 0; i < allMek.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMek[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await manik.removeParticipant(groupId, allMek[i].id)
                }
            }
            manik.reply(from, 'Success kick all member', id)
            break
            case prefix+'candlemug':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}candlemug manik`)
             const ddu = body.slice(11)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/candlemug/?text=${ddu}`)
                await limitAdd(serial)
                break
case prefix+'mugflower':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}mugflower manik`, id)
             const mug = body.slice(11)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/mugflower/?text=${mug}`)
                await limitAdd(serial)
                break
case prefix+'narutobanner':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}narutobanner manik`, id)
             const nar = body.slice(14)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/narutobanner/?text=${nar}`)
                await limitAdd(serial)
                break
case prefix+'paperglass':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}paperglass manik`, id)
             const papg = body.slice(12)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/paperonglass/?text=${papg}`)
                await limitAdd(serial)
                break
case prefix+'shadow':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}shadow manik`, id)
             const sdow = body.slice(8)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/shadowtext/?text=${sdow}`)
                await limitAdd(serial)
                break
case prefix+'coffe':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}coffe manik`, id)
             const kop = body.slice(7)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/coffeecup/?text=${kop}`)
                await limitAdd(serial)
                break
case prefix+'candy':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}candy manik`, id)
             const cndy = body.slice(7)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/sweetcandy/?text=${cndy}`)
                await limitAdd(serial)
                break
case prefix+'woodblock':
          if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return manik.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             if (args.length < 1) return manik.reply(from, `Contoh: ${prefix}woodblock manik`, id)
             const woblk = body.slice(11)
             manik.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
                await manik.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/woodblock/?text=${woblk}`)
                await limitAdd(serial)
                break
        case prefix+'leaveall':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id)
            const allChats = await manik.getAllChatIds()
            const allGroups = await manik.getAllGroups()
            for (let gclist of allGroups) {
                await manik.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await manik.leaveGroup(gclist.contact.id)}
            manik.reply(from, 'Succes leave all group!', id)
            break
            case prefix+'addgroup':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa digunakan oleh owner manik', id)
            manik.reply(from, 'SUCCESS MENAMBAHKAN GROUP KEDATABASE',id)
        break
        case prefix+'clearall':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id) 
            manik.reply(from, 'Succes clear all chat!', id)
        const allChatz = await manik.getAllChats()
            for (let dchat of allChatz) {
                await manik.deleteChat(dchat.id)}
            break
        case prefix+'oadd':
            const orang = args[1]
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return manik.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#add* 628xxxxx', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & premium $ special manik', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await manik.addParticipant(from,`${orang}@c.us`)
            } catch {
                manik.reply(from, mess.error.Ad, id)
            }
            break
        case prefix+'add':
            const orgh = body.slice(5)
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return manik.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#add* 628xxxxx', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await manik.addParticipant(from,`${orgh}@c.us`)
            } catch {
                manik.reply(from, mess.error.Ad, id)
            }
            break
        case prefix+'okick':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return manik.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *#okick* @tagmember', id)
            await manik.sendText(from, `Perintah Owner diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, ownerNumber).includes(mentionedJidList[i])) return manik.reply(from, mess.error.Sp, id)
                await manik.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case prefix+'kick':
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return manik.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *#kick* @tagmember', id)
            await manik.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return manik.reply(from, mess.error.Sp, id)
                await manik.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case prefix+'oleave':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & premium $ special manik', id)
            await manik.sendText(from,'manik DIPERINTAHKAN KELUAR OLEH OWNER!!').then(() => manik.leaveGroup(groupId))
            break
        case prefix+'leave':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await manik.sendText(from,'Sayonara').then(() => manik.leaveGroup(groupId))
            break
        case prefix+'opromote':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & premium $ special manik', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return manik.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return manik.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return manik.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await manik.promoteParticipant(groupId, mentionedJidList[0])
            await manik.sendTextWithMentions(from, `Perintah Owner diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case prefix+'promote':
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return manik.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return manik.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return manik.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await manik.promoteParticipant(groupId, mentionedJidList[0])
            await manik.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case prefix+'odemote':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & premium $ special manik', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return manik.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return manik.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return manik.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await manik.demoteParticipant(groupId, mentionedJidList[0])
            await manik.sendTextWithMentions(from, `Perintah Owner diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case prefix+'demote':
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return manik.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return manik.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return manik.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await manik.demoteParticipant(groupId, mentionedJidList[0])
            await manik.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case prefix+'join':
            if (args.length === 1) return manik.reply(from, 'Hanya Owner yang bisa memasukan Bot ke dalam Grup!', id)
            if (!isOwner, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & Special.     manik', id)
            const link = body.slice(6)
            const tGr = await manik.getAllGroups()
            const minMem = 5
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await manik.inviteInfo(link)
            if (!isLink) return manik.reply(from, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return manik.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return manik.reply(from, 'Member group tidak melebihi 5, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await manik.joinGroupViaLink(link)
                manik.reply(from, 'Bot akan segera masuk!', id)
            } else {
                manik.reply(from, 'Link group tidak valid!', id)
            }
            break
            case prefix+'revoke':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            await manik.revokeGroupInviteLink(groupId);
                manik.sendTextWithMentions(from, `Group link revoked by @${sender.id.replace('@c.us', '')}`)
            break
        case prefix+'odelete':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin, !isSpecial) return manik.reply(from, 'Perintah ini hanya untuk Owner & premium $ special manik', id)
            if (!quotedMsg) return manik.reply(from, 'Salah!!, kirim perintah *#delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return manik.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            manik.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case prefix+'delete':
            if (!isGroupMsg) return manik.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return manik.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return manik.reply(from, 'Salah!!, kirim perintah *#delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return manik.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            manik.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case prefix+'sider':
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)                
            if (!quotedMsg) return manik.reply(from, `Tolong Reply Pesan manik`, id)
            if (!quotedMsgObj.fromMe) return manik.reply(from, `Tolong Reply Pesan manik`, id)
            try {
                const reader = await manik.getMessageReaders(quotedMsgObj.id)
                let list = ''
                for (let pembaca of reader) {
                list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
            }
                manik.sendTextWithMentions(from, `Ciee, Ngeread...\n${list}`)
            } catch(err) {
                console.log(err)
                manik.reply(from, `Maaf, Belum Ada Yang Membaca Pesan manik atau Mereka Menonaktifkan Read Receipts`, id)    
            }
            break
        case prefix+'linkgroup':
            if (!isGroupMsg) return manik.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagcnye = chat.formattedTitle
            var gclink = await manik.getGroupInviteLink(groupId)
            var linkgc  = `Link group : *${namagcnye}*\n\n ${gclink}`
            manik.reply(from, linkgc, id)
            break
        case prefix+'resetlinkgroup':
            if (!isGroupMsg) return manik.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isGroupMsg) {
                await manik.revokeGroupInviteLink(groupId);
                manik.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
            }
            break
        case prefix+'sswabot':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id)            
            const sesPic = await manik.getSnapshot()
            manik.sendFile(from, sesPic, 'session.png', 'Nih boss, ramee', id)
            break
        case prefix+'manikadmin':
            let admn = `This is list of manik Admin\nTotal : ${adminNumber.length}\n`
            for (let i of adminNumber) {
                admn += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await manik.reply(from, admn, id)
            break
            case prefix+'manikspesial':
            let spec = `This is list of manik special\nTotal : ${specialNumber.length}\n`
            for (let i of specialNumber) {
                spec += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await manik.reply(from, spec, id)
            break
        case prefix+'limit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return manik.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return manik.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    manik.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    found = true
                }
            }
            console.log(limit)
            console.log(limidat)
            if (found === false){
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit, 1));
                manik.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            }
            break
        case prefix+'gift': // Hanya Admin & Owner manik yang bisa gift Limit
            if (!isOwner) return manik.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh user premium manik!`, id)
                    const nomerr = arg.split(' ')[0]
                    const jmla = arg.split(' ')[1]
                    if(!nomerr) return manik.reply(from, `Masukkan nomor yang akan di gift, ${prefix}gift [ @tagmember Jumlah ]\n=> Contoh : ${prefix}gift @62857371345721 15`, id)
                    let texta = nomerr.replace(/[-\s+@c.us]/g,'')
                    const cusz = texta + '@c.us'
                    if(!jmla) return manik.reply(from, `Masukkan Jumlah gift quota, ${prefix}gift [ @tagmember Jumlah ]\n=> Contoh : ${prefix}gift @62857371345721 15`, id)
                    if(jmla > 20) return await manik.reply(from, `Maximal  20!`, id)
                        var found = false
                        Object.keys(limit).forEach((i) => {
                            if(limit[i].id == cusz){
                                found = i
                            }
                        })
                        if (found !== false) {
                            limit[found].limit = Math.max(0, limit[found].limit);
                            if(limit[found].limit <= 20) return manik.reply(from, `Kuota Limit pada nomor tersebut masih penuh\nUntuk gift pastikan kuota limit target sudah habis`, id)
                            if(limit[found].limit <= 0) { // JIKA LIMIT 0 MAKA BISA GIFT
                                return manik.reply(from, `Kuota limit pada nomor tersebut sudah penuh!`, id)
                            }else{
                            limit[found].limit -= jmla
                            const updated = limit[found]
                            const result = `Gift kuota limit sukses dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
*「 GIFT KUOTA LIMIT 」*

• User : @${updated.id.replace('@c.us','')}
• Limit: ${limitCount-updated.limit}`
                            console.log(limit[found])
                            fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                            manik.sendTextWithMentions(from, result)
                            }
                        } else {
                                manik.reply(from, `Maaf, nomor itu tidak terdaftar di database!`, id)
                        }
                break
        case prefix+'eval':
            const q = args.join(' ')
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
            if (!q) return manik.reply(from, 'Harap masukkan code JavaScript!', id)
            try {
                let evaled = await eval(q)
                if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                manik.sendText(from, evaled)
            } catch (err) {
                manik.reply(from, err, id)
            }
        break
        case prefix+'restart': // WORK IF YOU RUN USING PM2
            if(isOwner){
                manik.sendText(from, '*[WARN]* Restarting ...')
                setting.restartState = true
                setting.restartId = chatId
                var obj = []
                //fs.writeFileSync('./lib/setting.json', JSON.stringify(obj, null,2));
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                const spawn = require('child_process').exec;
                function os_func() {
                    this.execCommand = function (command) {
                        return new Promise((resolve, reject)=> {
                        spawn(command, (error, stdout, stderr) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(stdout)
                        });
                    })
                }}
                var oz = new os_func();
                oz.execCommand('pm2 restart index').then(res=> {
                }).catch(err=> {
                    console.log("os >>>", err);
                })
            }
            break
        case prefix+'addprem':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                manik.reply(from, 'Success Menambahkan user premium manik!', id)
                }
            break
        case prefix+'delprem':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(inq, 1)
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                manik.reply(from, 'Success Menghapus user premium manik!', id)
            break
            case prefix+'addspecial':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/spesial.json', JSON.stringify(adminNumber))
                manik.reply(from, 'Success Menambahkan user special manik!', id)
                }
            break
        case prefix+'delspecial':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
                let idp = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(idp, 1)
                fs.writeFileSync('./lib/database/spesial.json', JSON.stringify(adminNumber))
                manik.reply(from, 'Success Menghapus user special manik!', id)
            break
        case prefix+'block':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await manik.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    manik.reply(from, `Success block ${args[1]}!`, id)
                })
            }
            break
        case prefix+'unblock':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner manik!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await manik.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    manik.reply(from, `Success unblok ${args[1]}!`, id)
                })
            } 
            break
        case prefix+'setname':
            if (!isOwner) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner manik!`, id)
                const setnem = body.slice(9)
                await manik.setMyName(setnem)
                manik.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setstatus':
            if (!isOwner) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner manik!`, id)
                const setstat = body.slice(11)
                await manik.setMyStatus(setstat)
                manik.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setprofilepic':
            if (!isOwner) return manik.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner manik!`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await manik.setProfilePic(imageBase64)
                manik.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await manik.setProfilePic(imageBase64)
                manik.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else {
                manik.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setprofilepic`, id)
            }
            break
        case prefix+'getpic':
            if (!isGroupMsg) return manik.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            const texnugm = body.slice(8)
            const getnomber =  await manik.checkNumberStatus(texnugm)
            const useriq = getnomber.id.replace('@','') + '@c.us'
                try {
                    var jnck = await manik.getProfilePicFromServer(useriq)

                    manik.sendFileFromUrl(from, jnck, `awok.jpg`)
                } catch {
                    manik.reply(from, `Tidak Ada Foto Profile!`, id)
                }
            break
        case prefix+'ban':
            if (!isAdmin) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh user premium manik!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber).includes(mentionedJidList[i])) return manik.reply(from,`Maaf ${pushname}, Kamu tidak bisa banned Admin manik!`, id)
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                manik.reply(from, `Succes ban target!`,id)
            }
            break
        case prefix+'unban':
            if (!isAdmin) return manik.reply(from, 'Perintah ini hanya bisa di gunakan oleh user premium manik!', id)
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                manik.reply(from, 'Unbanned User!', id)
            break
        case prefix+'listgroup':
                manik.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                manik.reply(from, gc, id)
            })
            break
        case prefix+'listbanned':
            let bened = `This is list of banned number\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await manik.reply(from, bened, id)
            break
        case prefix+'listblock':
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await manik.reply(from, hih, id)
            break
        case prefix+'ping':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            const loadedMsg = await manik.getAmountOfLoadedMessages()
            const botadmins = await manik.iAmAdmin()
            const blockedd = await manik.getBlockedIds()
            const chatIds = await manik.getAllChatIds()
            const groups = await manik.getAllGroups()
            const me = await manik.getMe()
            const battery = await manik.getBatteryLevel()
            const isCharging = await manik.getIsPlugged()
            const timestamp = speed();
            const latensi = speed() - timestamp
            await manik.reply(from, `*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗣𝗖 」*\nPenggunaan RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\nCPU: ${os.cpus()[0].model}\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 」* :\n- *${loadedMsg}* Loaded Messages\n- *${chatIds.length - groups.length}* Total Chats\n  ├ *${groups.length}* Group Chats\n  └ *${chatIds.length}* Personal Chats\n- *${groups.length}* Groups Joined\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗨𝗦𝗘𝗥 」*\n- *${pendaftar.length}* Registered User\n  ├ *${banned.length}* Banned User\n  ├ *${blockedd.length}* Blocked User\n  └ *${adminNumber.length}* Admin User\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗗𝗘𝗩𝗜𝗖𝗘 」*\n${(`\n*Battery* : ${battery}% ${isCharging ? 'Lagi Di Cas...' : 'Ga Di Cas!'}\n${Object.keys(me.phone).map(key => `${key} : ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed:* ${latensi.toFixed(4)} _Second_`, id)
            break
        case prefix+'setgroupname':
            if (!isGroupMsg) return manik.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(14)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await manik.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            manik.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
        case prefix+'setgroupicon':
            if (!isGroupMsg) return manik.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return manik.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await manik.setGroupIcon(from, imageBase64)
                manik.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await manik.setGroupIcon(from, imageBase64)
                manik.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                manik.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setgroupicon`, id)
            }
            break
        case prefix+'bugreport':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return manik.reply(from, '[❗] Kirim perintah *#bugreport [teks]*\ncontoh : *#bugreport Permisi Owner, Ada bug pada command #otakudesu, Tolong diperbaiki*')
            const bug = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                manik.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                manik.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.' ,id)
            }else{
                manik.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                manik.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
            }
            break
         case prefix+'profile':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isGroupMsg) {
                if (!quotedMsg) {
                    var block = blockNumber.includes(author)
                    var bend = banned.includes(author)
                    var sts = await manik.getStatus(author)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    var ctt = await manik.getContact(author)
                    const { status } = sts
                    var found = false
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == author){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = author;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await manik.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await manik.getProfilePicFromServer(author)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                        await manik.sendContact(chatId, author)
                        manik.sendFileFromUrl(from, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin manik: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                } else if (quotedMsg) {
                    var qmid = quotedMsgObj.sender.id
                    var block = blockNumber.includes(qmid)
                    var bend = banned.includes(qmid)
                    var gpic = await manik.getProfilePicFromServer(qmid)
                    var namae = quotedMsgObj.sender.name
                    var sts = await manik.getStatus(qmid)
                    var ctt = await manik.getContact(qmid)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    const { status } = sts
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == qmid){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = qmid;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await manik.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await manik.getProfilePicFromServer(qmid)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                    await manik.sendContact(chatId, qmid)
                    manik.sendFileFromUrl(from, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin manik: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                }
            }
            break
    // Fadhlur Owner of NotBot Bug? wa : wa.me/6281395771492
        case '#slot':
          const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]  
             manik.sendText(from, `[  🎰 | SLOTS ]\n-----------------\n🍋 : 🍌 : 🍍\n${somtoy}<=====\n🍋 : 🍌 : 🍍\n[  🎰 | SLOTS ]\n\nKeterangan : Jika anda Mendapatkan 3Buah anda Menang\n\nContoh : 🍌 : 🍌 : 🍌<=====`, id)
        break
    //list menu
        case prefix+'runtime':
            manik.reply(from, `manik telah aktif selama :\n${cts}`, id)
            break
        case prefix+'menu':
        case prefix+'help':
        case 'p':
            manik.sendFileFromUrl(from, `https://i.ibb.co/3fCYLDT/20210124-185418.jpg`,`menu.jpg`,`  ❥┯─●MANIK BOT───────╮  
╭╯
├✧ུNama : *MANIK BOT*
├✧ུFounder : *ARYA MANIK*
├✧ུStatus : *ACTIVE*
├✧ུPrefix : *❪${prefix}❫*
├✧ུOwner : *wa.me/6285737134572*
├✧ུUser : *${pendaftar.length} User Registered*
╰───────────────
╭◪ 𝐑𝐮𝐥𝐞𝐬𝐒 
╰───────────────╮  
╭───────────────╯
├⊱❏ *Spam : Auto Block!*
├⊱❏ *Beri Jeda 5 Detik!*
├⊱❏ *No Vc/Tlpn=Block!*
├⊱❏ *Donasi Sultan Buat Apikey!*
├⊱❏ *Jangan Lupa Donasi Agar Bot Selalu Aktif*
├⊱❏ *https://saweria.co/Aryamanik*
╰───────────────╯
 ❥┯─●LIST MENU────────╮  
╭╯
├⊱❏ *${prefix}ownermenu*
├⊱❏ *${prefix}premiummenu*
├⊱❏ *${prefix}specialmenu*✔NEW
├⊱❏ *${prefix}groupmenu*
├⊱❏ *${prefix}praymenu*
├⊱❏ *${prefix}nsfwmenu*
├⊱❏ *${prefix}funmenu*
├⊱❏ *${prefix}mediamenu*
├⊱❏ *${prefix}makermenu* ✔NEW
├⊱❏ *${prefix}kerangmenu*
├⊱❏ *${prefix}downloadmenu*
├⊱❏ *${prefix}othermenu*
╰───────────────╯
 ❥┯─●OTHER MENU───────╮  
╭╯
├⊱❏ *${prefix}manikgroup*
├⊱❏ *${prefix}manikadmin*
├⊱❏ *${prefix}manikspesial*
├⊱❏ *${prefix}owner*
├⊱❏ *${prefix}sewabot*
├⊱❏ *${prefix}donate*
├⊱❏ *${prefix}katamanik*
╰───────────────╯
╭───●TELAH AKTIF──────╮  
├⊱❏ *AKTIF : ${cts}*
╰───────────────╯
◩ *Developer © MANIK*`, id)        
            break
        case prefix+'manikgroup':
            manik.reply(from, `Link Group manik : https://chat.whatsapp.com/GRFRFA1bEvo43k9gloC0Jk\nJangan Lupa Join group Ya Kak ${pushname}`, id)
            break
        case prefix+'specialmenu':
        if (!isSpecial) return manik.reply(from, 'Perintah ini hanya untuk special manik', id)
        manik.reply(from, `❥┯─●SPECIAL MENU───────╮  
╭╯
├⊱❏ *${prefix}join <link group> [MAX 3X!]*
├⊱❏ *${prefix}premiummenu*
╰───────────────╯`, id)
    break
        case prefix+'groupmenu':
            manik.sendText(from, groupcmd(prefix))
            break
        case prefix+'mediamenu':
            manik.sendText(from, mediacmd(prefix))
            break
        case prefix+'funmenu':
            manik.sendText(from, funcmd(prefix))
            break
        case prefix+'animemenu':
            manik.sendText(from, animecmd(prefix))
            break
        case prefix+'kerangmenu':
            manik.sendText(from, kerangcmd(prefix))
            break
        case prefix+'downloadmenu':
            manik.sendText(from, downloadcmd(prefix))
            break
        case prefix+'othermenu':
            manik.sendText(from, othercmd(prefix))
            break
        case prefix+'sewabot':
            manik.sendText(from, sewa())
            break
            case prefix+'makermenu':
            manik.sendText(from, `
╭──●MAKER MENU───────╮  
├⊱❏ *${prefix}tahta [teks]*
├⊱❏ *${prefix}glitch [|teks1|teks2]*
├⊱❏ *${prefix}lovemessage [teks]*
├⊱❏ *${prefix}romance [teks]*
├⊱❏ *${prefix}party [teks]*
├⊱❏ *${prefix}silk [teks]*
├⊱❏ *${prefix}thunder [teks]*
├⊱❏ *${prefix}blackpink [teks]*
├⊱❏ *${prefix}pornhub [|teks1|teks2]*
├⊱❏ *${prefix}nulis2 [teks]*
├⊱❏ *${prefix}sandwriting [teks]*
├⊱❏ *${prefix}quotemaker [|teks|author|theme]*
├⊱❏ *${prefix}harrypotter [teks]* ✔NEW
├⊱❏ *${prefix}halloween [teks]* ✔NEW
├⊱❏ *${prefix}burnpaper [teks]* ✔NEW
├⊱❏ *${prefix}8bit [ |Teks1|Teks2 ]* ✔NEW
├⊱❏ *${prefix}glowneon [teks]* ✔NEW
├⊱❏ *${prefix}gsuggest [|teks|teks2|teks3]* ✔NEW
├⊱❏ *${prefix}candlemug* ✔NEW
├⊱❏ *${prefix}mugflower* ✔NEW
├⊱❏ *${prefix}narutobanner* ✔NEW
├⊱❏ *${prefix}paperglass* ✔NEW
├⊱❏ *${prefix}shadow* ✔NEW
├⊱❏ *${prefix}coffe* ✔NEW
├⊱❏ *${prefix}candy* ✔NEW
├⊱❏ *${prefix}woodblock* ✔NEW
╰───────────────╯
◩ *Developer © MANIK*`, id)
            break
        case prefix+'premiummenu':
            if (!isAd) return manik.reply(from, 'Perintah ini hanya untuk premium manik', id)
            manik.sendText(from, admincmd(prefix))
            break
        case prefix+'ownermenu':
            if (!isOwner) return manik.reply(from, 'Perintah ini hanya untuk Owner manik', id)
            manik.sendText(from, ownercmd(prefix))
            break
        case prefix+'praymenu':
            manik.sendText(from, praycmd(prefix))
            break
        case prefix+'nsfwmenu':
            if (!isGroupMsg) return manik.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return manik.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            manik.sendText(from, nsfwcmd(prefix))
            break
        // INFORMATION
        case prefix+'donate':
            manik.sendText(from, sumbang())
            break
        case prefix+'readme':
            manik.sendText(from, readme(prefix))
            break
        case prefix+'info':
            manik.sendText(from, info())
            break
        case prefix+'bahasa':
            manik.sendText(from, bahasalist())
            break
// By Gimenz
        case prefix+'wa.me':
        case prefix+'wame':
            await manik.reply(from, `*Neh Mhank Link Nomor Wa Lu ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*Atau*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`)
            break
// By Gimenz
        case prefix+'snk':
            manik.reply(from, snk(), id)
            break
        default:
            //if (!isGroupMsg) return manik.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup manik, Link Ada Di Bio atau Bisa Mengetik #manikgroup!\nJika Ingin Sewa Bot atau Bikin Bot Harap Ketik *#sewabot*', id)
            if (command.startsWith('#')) {
                manik.reply(from, `Maaf ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *#menu*!`, id)
            }
            await manik.sendSeen(from) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //manik.kill().then(a => console.log(a))
    }
}

