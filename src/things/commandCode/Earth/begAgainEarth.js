const invSchema = require('../../../models/inventorySchema')
const profileSchema = require('../../../models/userProfile')
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder
} = require('discord.js')

async function begAgainEarth(interaction) {
    let userProfile = await profileSchema.findOne({
        userId: interaction.user.id
    })
    if (!userProfile) userProfile = await profileSchema.create({userId: interaction.user.id})
    const randomCoins = Math.round(Math.random() * (5000 - 1) + 1)
    const willGetRandomItem = Math.round(Math.random() * 200)
    const willGetDevCoin = Math.round(Math.random() * 20)
    if (willGetDevCoin === 0){
        const lookupDevCoin = await invSchema.findOne({
            userId: interaction.user.id,
            itemId: 'dev coin'
        })
        if (!lookupDevCoin) invSchema.create({
            userId: interaction.user.id,
            itemId: 'dev coin',
            item: 'Dev Coin',
            amount: 1,
            emoji: '<:DeveloperCoin:1005438384765947904>'
        })
        else {
            lookupDevCoin.amount += 1;
            lookupDevCoin.save()
        }

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${interaction.user.tag} begged KSchlatt`)
                .setColor('0xa744fc')
                .setDescription(`Schlatt gave you a <:DeveloperCoin:1005438384765947904> Dev Coin`)
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Beg Again')
                    .setCustomId('beg-again')
                    .setStyle('Secondary')
                )
            ]
        })
    } else if (willGetRandomItem === 0) {
        const lookupFunnyDog = await invSchema.findOne({
            userId: interaction.user.id,
            itemId: 'funny dog'
        })
        if (!lookupFunnyDog) invSchema.create({
            userId: interaction.user.id,
            itemId: 'funny dog',
            item: 'Funny dog',
            amount: 1,
            emoji: '<:FunnyDog:1006293232780587178>'
        })
        else lookupFunnyDog.amount += 1;
        lookupFunnyDog.save()

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${interaction.user.tag} went begging in the pet shop`)
                .setColor('0xa744fc')
                .setDescription(`The pet shop owner gave you a <:FunnyDog:1006293232780587178> Funny Dog but took your shovel`)
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Beg Again')
                    .setCustomId('beg-again')
                    .setStyle('Secondary')
                )
            ]
        })
    } else {
        let amount = Math.round((randomCoins / 100 * userProfile.coinMulti) + randomCoins)
        userProfile.wallet += amount
        userProfile.save()

        const begThings = [
            `An old woman felt sorry for you and gave you \`${amount.toLocaleString()}\` coins`,
            `You begged a tree for cash and somehow got \`${amount.toLocaleString()}\` coins`,
            `You did an @everyone ping begging for cash and the server paid you \`${amount.toLocaleString()}\` coins to stop`,
            `Your begging paid off. You got \`${amount.toLocaleString()}\` coins`,
            `You begged and \`${amount.toLocaleString()}\` coins appeared`,
            `You asked KSchlatt for coins and he gave you \`${amount.toLocaleString()}\``
        ]

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${interaction.user.tag} went begging`)
                .setColor('0xa744f2')
                .setDescription(`${begThings[Math.floor(Math.random() * begThings.length)]}`)
                // .setFooter({
                //     text: `${multi === 0 ? '' : `+${multi.toLocaleString()} coins (Your multiplier is +${userProfile.coinMulti.toLocaleString()}%)`}`
                // })
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Beg Again')
                    .setCustomId('beg-again')
                    .setStyle('Secondary')
                )
            ]
        })
    }
}

module.exports = {
    begAgainEarth
}