# GloBot

Twitch Bot made for [GlobalLightning342's Twitch Chat](https://twitch.tv/globallightning342)!

## Documentation

The commands and syntaxes are listed below. All parameters surrounded by <> are required, and parameters surrounded by [] are optional. When typing the command, do not include the <> or [], just type the data for the parameter and separate parameters by a space.

### Viewing quotes

To view a random quote, you can use the command below: (This will also give you the quote number)

`!quote`

To view a specific quote, you can use the command below:

`!quote <quote number>`

The quote number is the number listed before the quote.

> Example: `!quote 1`

### Adding quotes

To add a quote, use the command below:

`!quote add <quote>`

When adding a quote, you can surround the quote with quotation marks ("") and you can mark the person that said the quote after the quote, separated by a hyphen (-).

> Example: `!quote add "Booty flakes" -Global`

**This command is restricted to the broadcaster, moderators, subscribers, and whitelisted users. (Channel VIP users in the future)**

### Editing quotes

To edit a quote, you can use the command below:

`!quote edit <quote number> <new quote>`

The quote number is the number before the quote when it is displayed, and the new quote is the new quote that you want to put in place of the old quote. This can be used to entirely replace a quote if necessary, or to just fix a small spelling mistake.

> Example: `!quote edit 1 "Booty flakes" -Global`

**This command is restricted to the broadcaster and moderators.**

### Removing quotes

In the case that a quote needs to be removed, you can use the command below: **[NOT RECOMMENDED]**

`!quote remove <quote number>`

This is not recommended since it was cause all following quotes to shift frames, therefore decreasing the index of all of the quotes afterwards. This is not a big problem, the only thing that is changed is all of the quote numbers after the one you changed. It is especially fine to remove a later quote, since it will only change the few (if any) quotes added after the one you are removing.

> Example: `!quote remove 1`

**This command is restricted to the broadcaster and moderators.**

### Whitelisting and unwhitelisting users

To whitelist a user, use the command below:

`!quote whitelist <twitch username>`

To unwhitelist a user, use the command below:

`!quote unwhitelist <twitch username>`

A whitelisted user has access to add quotes. The broadcaster, mods, and subscribers already have access to this. You can also place an @ before the username for twitch's autofill, but no other special characters. The username is not case-sensitive.

> Examples: `!quote whitelist GlobalLightning342` **or** `!quote whitelist @globallightning342`

> Examples: `!quote unwhitelist globallightning342` **or** `!quote unwhitelist @GlobalLightning342`

**This command is restricted to the broadcaster and moderators.**

### Blacklisting and unblacklisting users

Similarly to whitelisting users, to blacklist a user, use the command below:

`!quote blacklist <twitch username>`

To unblacklist a user, use the command below:

`!quote unblacklist <twitch username>`

A blacklisted user cannot add, edit, or remove quotes, as well as whitelist or blacklist users. You can blacklist any user, including mods and subscribers, which prevents them from using the aforementioned commands. You can also place an @ before the username for twitch's autofill, but no other special characters. The username is not case-sensitive.

Global, LadyWildcat, and Battlecats cannot be blacklisted.

**This command is restricted to the broadcaster and moderators.**

---

Bot made by [Battlecats59](https://twitch.tv/battlecats59). Please report any problems to me via DMs (Battlecats59#0001) or ping me in [Global's server](https://discord.gg/TnTMRHKeJa).