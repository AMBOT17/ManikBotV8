const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const left = require('./lib/left')
const cron = require('node-cron')
const color = require('./lib/color')
const fs = require('fs')
// const msgHndlr = require ('./manik')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const options = require('./options')

// AUTO UPDATE BY NURUTOMO
// THX FOR NURUTOMO
// Cache handler and check for file change
require('./manik.js')
nocache('./manik.js', module => console.log(`'${module}' Updated!`))
require('./lib/help.js')
nocache('./lib/help.js', module => console.log(`'${module}' Updated!`))
require('./lib/database/setting.json')
nocache('./lib/database/setting.json', module => console.log(`'${module}' Updated!`))

const adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
const setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    mtc: mtcState,
    banChats,
    restartState: isRestart
    } = setting

function restartAwal(manik){
    setting.restartState = false
    isRestart = false
    manik.sendText(setting.restartId, 'Restart Succesfull!')
    setting.restartId = 'undefined'
    //fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
}

lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;

const start = async (manik = new Client()) => {
        console.log('------------------------------------------------')
        lolcatjs.fromString(color(figlet.textSync('MANIK BOT', { horizontalLayout: 'full' })))
        console.log('------------------------------------------------')
        lolcatjs.fromString('[DEV] manik')
        lolcatjs.fromString('[SERVER] Server Started!')
        manik.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))
        // Force it to keep the current session
        manik.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') manik.forceRefocus()
        })
        // listening on message
        manik.onMessage((async (message) => {

        manik.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 1000) {
                    console.log('[CLIENT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    manik.cutMsgCache()
                }
            })
        // msgHndlr(manik, message)
        // Message Handler (Loaded from recent cache)
        require('./manik.js')(manik, message)
    }))
           

        manik.onGlobalParticipantsChanged((async (heuh) => {
            await welcome(manik, heuh) 
            left(manik, heuh)
            }))
        
        manik.onAddedToGroup(async (chat) => {
            if(isWhite(chat.id)) return manik.sendText(chat.id, 'Halo aku MANIK, Ketik #help Untuk Melihat List Command Ku...')
            if(mtcState === false){
                const groups = await manik.getAllGroups()
                // BOT group count less than
                if(groups.length > groupLimit){
                    await manik.sendText(chat.id, 'Maaf, Batas group yang dapat MANIK tampung sudah penuh').then(async () =>{
                        manik.deleteChat(chat.id)
                        manik.leaveGroup(chat.id)
                    })
                }else{
                    if(chat.groupMetadata.participants.length < memberLimit){
                        await manik.sendText(chat.id, `Maaf, BOT keluar jika member group tidak melebihi ${memberLimit} orang`).then(async () =>{
                            manik.deleteChat(chat.id)
                            manik.leaveGroup(chat.id)
                        })
                    }else{
                        if(!chat.isReadOnly) manik.sendText(chat.id, 'Halo aku MANIK, Ketik #help Untuk Melihat List Command Ku...')
                    }
                }
            }else{
                await manik.sendText(chat.id, 'MANIK sedang maintenance, coba lain hari').then(async () => {
                    manik.deleteChat(chat.id)
                    manik.leaveGroup(chat.id)
                })
            }
        })

        /*manik.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) manik.sendSeen(to)
        }))*/

        // listening on Incoming Call
        manik.onIncomingCall(( async (call) => {
            await manik.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nJika ingin membuka block harap chat Owner!')
            .then(() => manik.contactBlock(call.peerJid))
        }))
    }

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

create(options(true, start))
    .then(manik => start(manik))
    .catch((error) => console.log(error))
