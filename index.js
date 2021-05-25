const tmi = require('tmi.js');
const fs = require('fs');
const config = require('./config.json');

require('dotenv').config({ path: './app.env' });

const tmiconfig = {
    identity: {
        username: process.env.tmiUsername,
        password: process.env.tmiOAuth
    },
    channels: config.channels
};
const client = new tmi.client(tmiconfig);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

function onMessageHandler (target, tags, msg, self) {
    if (self) { return; };
    tmsg = msg.trim();
    args = tmsg.split(/ +/);
    cmd = args.shift().toLowerCase();

    if (cmd === '!quote') {
        if(args[0]) {
            subcmd = args.shift();

            if(parseInt(subcmd)) {
                nquote = parseInt(subcmd);
                quotes = fs.readFileSync('./Data/quotes.txt').toString().split('\n');

                if(nquote < 1 || nquote > quotes.length) {
                    client.say(target, `@${tags.username} -> Quote not found!`);
                } else {
                    client.say(target, `@${tags.username} -> #${nquote}: ${quotes[nquote - 1]}`);
                    console.log(`Generated quote #${nquote}: ${quotes[nquote - 1]}`);
                }
            }

            if(subcmd == 'permissions' || subcmd == 'perms') {
                if(JSON.parse(fs.readFileSync('./Data/quotes.json')).blacklist.includes(tags.username)) {
                    client.say(target, `@${tags.username} -> You are blacklisted from adding or editing quotes. You can still view quotes with !quote.`);
                    return;
                } else if(tags.mod == true) {
                    client.say(target, `@${tags.username} -> You are a moderator.`);
                    return;
                } else if(tags.subscriber == true) {
                    client.say(target, `@${tags.username} -> You are a subscriber. You can add quotes.`);
                    return;
                } else if(JSON.parse(fs.readFileSync('./Data/quotes.json')).whitelist.includes(tags.username)) {
                    client.say(target, `@${tags.username} -> You are whitelisted to add quotes.`);
                    return;
                }
            }

            if(JSON.parse(fs.readFileSync('./Data/quotes.json')).blacklist.includes(tags.username)) {
                client.say(target, `@${tags.username} -> You are missing permissions to use this command!`);
                return;
            }

            if(subcmd == 'add') {
                if(tags.username == "globallightning342" || tags.mod == true || tags.subscriber == true || JSON.parse(fs.readFileSync('./Data/quotes.json')).whitelist.includes(tags.username) == true) {
                    if(args[0]) {
                        addquote = args.join(' ');
                        quotes = fs.readFileSync('./Data/quotes.txt').toString();
                        newquotes = quotes + '\n' + addquote
                        fs.writeFile('./Data/quotes.txt', newquotes, (err) => {
                            if(err) {
                                console.log("An error occurred. [ERROR CODE 541]");
                                client.say(target, `@${tags.username} -> An error occurred when writing the new quote`);
                                return;
                            } else {
                                client.say(target, `@${tags.username} -> Added quote #${quotes.split('\n').length + 1}`);
                                console.log(`User ${tags.username} added quote #${quotes.split('\n').length + 1} -> ${addquote}`);
                            }
                        })
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a quote to add!`);
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to add quotes!`)
                }
                
            } else if(subcmd == 'edit') {
                if(tags.username == "globallightning342" || tags.mod == true) {
                    if(args[0]) {
                        equote = args.shift();
                        if(parseInt(equote)) {
                            nquote = parseInt(equote);
                            quotes = fs.readFileSync('./Data/quotes.txt').toString().split('\n');

                            if(nquote < 1 || nquote > quotes.length) {
                                client.say(target, `@${tags.username} -> You must provide a valid quote number to edit!`);
                                return;
                            } else {
                                if(args[0]) {
                                    equotec = args.join(' ');
                                    quotes[equote - 1] = equotec;
                                    fs.writeFile('./Data/quotes.txt', quotes.join('\n'), (err) => {
                                        if(err) {
                                            console.log("An error occurred. [ERROR CODE 544]");
                                            client.say(target, `@${tags.username} -> An error occurred when writing the new quote`);
                                            return;
                                        } else {
                                            client.say(target, `@${tags.username} -> Edited quote #${equote}`);
                                            console.log(`User ${tags.username} edited quote #${equote} -> ${equotec}`);
                                        }
                                    })
                                } else {
                                    client.say(target, `@${tags.username} -> You must provide a new quote!`);
                                    return;
                                }
                            }
                        } else {
                            client.say(target, `@${tags.username} -> You must provide a valid quote number to edit!`);
                            return;
                        }
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a valid quote number to edit!`);
                        return;
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to edit quotes!`)
                    return;
                }
            } else if(subcmd == 'remove') {
                if(tags.username == "globallightning342" || tags.mod == true) {
                    if(args[0]) {
                        if(parseInt(args[0])) {
                            nquote = parseInt(args[0]);
                            quotes = fs.readFileSync('./Data/quotes.txt').toString().split('\n');
                            if(nquote < 1 || nquote > quotes.length) {
                                client.say(target, `@${tags.username} -> You must provide a valid quote number to remove!`);
                                return;
                            } else {
                                rmquote = quotes[nquote - 1]
                                newquotes = quotes.filter(q => q != rmquote);
                                fs.writeFile('./Data/quotes.txt', newquotes.join('\n'), (err) => {
                                    if(err) {
                                        console.log("An error occurred. [ERROR CODE 545]");
                                        client.say(target, `@${tags.username} -> An error occurred when removing the quote.`);
                                        return;
                                    } else {
                                        client.say(target, `@${tags.username} -> Removed quote #${nquote}: ${rmquote}`);
                                        console.log(`User ${tags.username} removed quote #${nquote}: ${rmquote}`);
                                    }
                                })
                            }
                        } else {
                            client.say(target, `@${tags.username} -> You must provide a valid quote number to remove!`);
                            return;
                        }
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a valid quote number to edit!`);
                        return;
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to edit quotes!`)
                    return;
                }
            } else if(subcmd == 'whitelist') {
                if(tags.username == "globallightning342" || tags.mod == true) {
                    if(args[0]) {
                        userwhitelist = args[0].replace('@', '').toLowerCase();
                        whitelist = JSON.parse(fs.readFileSync('./Data/quotes.json'))
                        if(!whitelist.whitelist.includes(userwhitelist)) {
                            whitelist.whitelist.push(userwhitelist)
                            fs.writeFile('./Data/quotes.json', JSON.stringify(whitelist, null, 2), (err) => {
                                if(err) {
                                    console.log("An error occurred. [ERROR CODE 542]");
                                    client.say(target, `@${tags.username} -> An error occurred when whitelisting the user`);
                                    return;
                                } else {
                                    client.say(target, `@${tags.username} -> Added user @${userwhitelist} to the whitelist`);
                                    console.log(`User ${tags.username} added user ${userwhitelist} to the whitelist`);
                                }
                            });
                        } else {
                            client.say(target, `@${tags.username} -> User @${userwhitelist} is already whitelisted!`);
                            return;
                        }
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a user to whitelist!`);
                        return;
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to add users to the whitelist!`)
                    return;
                }
            } else if(subcmd == 'unwhitelist') {
                if(tags.username == "globallightning342" || tags.mod == true) {
                    if(args[0]) {
                        userwhitelist = args[0].replace('@', '').toLowerCase();
                        whitelist = JSON.parse(fs.readFileSync('./Data/quotes.json'))
                        if(whitelist.whitelist.includes(userwhitelist)) {
                            newwhitelist = whitelist.whitelist.filter(wluser => wluser != userwhitelist);
                            whitelist.whitelist = newwhitelist;
                            fs.writeFile('./Data/quotes.json', JSON.stringify(whitelist, null, 2), (err) => {
                                if(err) {
                                    console.log("An error occurred. [ERROR CODE 543]");
                                    client.say(target, `@${tags.username} -> An error occurred when unwhitelisting the user`);
                                    return;
                                } else {
                                    client.say(target, `@${tags.username} -> Removed user @${userwhitelist} from the whitelist`);
                                    console.log(`User ${tags.username} removed user ${userwhitelist} from the whitelist`);
                                }
                            });
                        } else {
                            client.say(target, `@${tags.username} -> User @${userwhitelist} is not whitelisted!`);
                            return;
                        }
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a user to unwhitelist!`);
                        return;
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to update the whitelist!`)
                    return;
                }
            } else if(subcmd == 'blacklist') {
                if(tags.username == "globallightning342" || tags.mod == true) {
                    if(args[0]) {
                        userblacklist = args[0].replace('@', '').toLowerCase();

                        if(userblacklist == 'globallightning342') {
                            client.say(target, `@${tags.username} -> Nice try, but you can't blacklist Global KEKW`);
                            return;
                        } else if(JSON.parse(fs.readFileSync('./Data/quotes.json'))["blacklist-immune"].includes(userblacklist)) {
                            client.say(target, `@${tags.username} -> You can't blacklist that user!`);
                            return;
                        }

                        blacklist = JSON.parse(fs.readFileSync('./Data/quotes.json'))
                        if(!blacklist.blacklist.includes(userblacklist)) {
                            blacklist.blacklist.push(userblacklist)
                            fs.writeFile('./Data/quotes.json', JSON.stringify(blacklist, null, 2), (err) => {
                                if(err) {
                                    console.log("An error occurred. [ERROR CODE 542]");
                                    client.say(target, `@${tags.username} -> An error occurred when blacklisting the user`);
                                    return;
                                } else {
                                    client.say(target, `@${tags.username} -> Added user @${userblacklist} to the blacklist`);
                                    console.log(`User ${tags.username} added user ${userblacklist} to the blacklist`);
                                }
                            });
                        } else {
                            client.say(target, `@${tags.username} -> User @${userblacklist} is already blacklisted!`);
                            return;
                        }
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a user to blacklist!`);
                        return;
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to add users to the blacklist!`)
                    return;
                }
            } else if(subcmd == 'unblacklist') {
                if(tags.username == "globallightning342" || tags.mod == true) {
                    if(args[0]) {
                        userblacklist = args[0].replace('@', '').toLowerCase();
                        blacklist = JSON.parse(fs.readFileSync('./Data/quotes.json'))
                        if(blacklist.blacklist.includes(userblacklist)) {
                            newblacklist = blacklist.blacklist.filter(wluser => wluser != userblacklist);
                            blacklist.blacklist = newblacklist;
                            fs.writeFile('./Data/quotes.json', JSON.stringify(blacklist, null, 2), (err) => {
                                if(err) {
                                    console.log("An error occurred. [ERROR CODE 543]");
                                    client.say(target, `@${tags.username} -> An error occurred when unblacklisting the user`);
                                    return;
                                } else {
                                    client.say(target, `@${tags.username} -> Removed user @${userblacklist} from the blacklist`);
                                    console.log(`User ${tags.username} removed user ${userblacklist} from the blacklist`);
                                }
                            });
                        } else {
                            client.say(target, `@${tags.username} -> User @${userblacklist} is not blacklisted!`);
                            return;
                        }
                    } else {
                        client.say(target, `@${tags.username} -> You must provide a user to unblacklist!`);
                        return;
                    }
                } else {
                    client.say(target, `@${tags.username} -> You are missing permissions to update the blacklist!`)
                    return;
                }
            }
        } else {
            quotes = fs.readFileSync('./Data/quotes.txt').toString().split('\n');
            rquote = Math.floor(Math.random() * quotes.length);
            client.say(target, `@${tags.username} -> #${rquote + 1}: ${quotes[rquote]}`);
            console.log(`Generated quote #${rquote + 1}: ${quotes[rquote]}`);
        }
    } else if(cmd === '!help') {
        client.say(target, `@${tags.username} -> https://github.com/Battlecats59/GloBot/blob/main/Docs/help.md`);
    }
  }

function onConnectedHandler (a, p) {
    console.log(`Connected to Twitch server at address ${a}:${p}`);
}

client.connect({
    connection: {
        reconnect: true
    }
});