import {
    Client, GatewayIntentBits, REST, Routes
} from 'discord.js';

import { MESSAGES } from '#message'
import * as handler from '#handler';
import * as log from '#log';

const RETRY_DELAY = 5;
const RETRY_COUNT = 3;

const STATUS = Object.freeze({
    online: MESSAGES.STATUS.ONLINE,
    idle: MESSAGES.STATUS.IDLE,
    dnd: MESSAGES.STATUS.DND,
    invisible: MESSAGES.STATUS.INVISIBLE,
    unknown: MESSAGES.STATUS.UNKNOWN,
});

export class JjingBot extends Client {

    constructor() { super({ intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds]});

        this.#initialize();
    
        this.jjing = {
            name: '',
            path: 'src/commands',
            list: [],
        }
    }

    #initialize() {
        this.once('clientReady', async () => {
            await this.ready();
        });

        this.on('interactionCreate', (i) => {
            handler.interaction(this, i);
        });

        this.on('messageCreate', (m) => {
            handler.message(this, m);
        });
    }

    async registerCommands() {
        try {
            const rest = new REST({ version: '10' })
                .setToken(this.jjing?.token);

            const body = this.jjing?.list.flatMap(c =>
                c.commands?.map(cmd =>
                cmd.toJSON()) ?? []);

            if (!this.jjing?.clientId) {
                this.#undefinedClient();
            }

            await rest.put(
                Routes.applicationGuildCommands(
                    this.jjing?.clientId,
                    this.jjing?.guildId), { body: [] });

            if (!this.jjing?.guildId) {
                this.#undefinedGuild();
            }
            
            await rest.put(
                Routes.applicationCommands(
                    this.jjing?.clientId), { body: [] }
            )

            log.load(MESSAGES.COMMAND.SUCCESS);
        } catch (e) {
            this.#errorCommands(e);
        }
    }

    #undefinedClient() {
        throw new Error(
            MESSAGES.COMMAND.CLIENT_UNDEFINED);
    }

    #errorCommands(error) {
        log.error(MESSAGES.COMMAND.FAIL);
        handler.error(error);
    }

    config(options = {}) {
        const valid = Object.fromEntries(
            Object.entries(options)
            .filter(([_, v]) => v !== undefined));

        Object.assign(this.jjing, valid);
    }

    async ready() {
        this.#printBanner(this.jjing?.name);

        log.load(MESSAGES.LOGIN.SUCCESS);
        log.info('👤', this.user.tag);

        this.#changeStatus(this.jjing?.status)

        this.#printGuild(this.jjing?.guildId);

        await this.registerCommands();
    }
    
    #printBanner(name) {
        if (!name) return;
        console.log('────────────────────')
        console.log(`${name}`);
        console.log('────────────────────')
    }
    
    #changeStatus(status) {
        if (!status) return;
        this.user.setPresence({
            status});

        log.info(
            STATUS[this.user.presence.status]
            || STATUS.unknown);
    }

    async #printGuild(guildId) {
        try {
            if (!guildId) {
                this.#undefinedGuild();
            }

            const guild = await this
                .guilds.fetch(guildId);
            
            log.load(MESSAGES.GUILD.SUCCESS);
            log.info('🚪', guild.name);
        } catch (e) {
            this.#errorGuild(e);
        }
    }

    #undefinedGuild() {
        throw new Error(
            MESSAGES.GUILD.GUILD_UNDEFINED);
    }

    #errorGuild(error) {
        log.error(MESSAGES.GUILD.FAIL);
        handler.error(error);
    }

    async start(retry = 0) {
        try {
            if (!this.jjing?.token) {
                this.#undefinedToken();
            }

            await this.login(
                this.jjing?.token);
        } catch (e) {
            this.#errorStart(e, retry);
        }
    }

    #undefinedToken() {
        throw new Error(
            MESSAGES.LOGIN.TOKEN_UNDEFINED);
    }

    #errorStart(error, retry) {
        log.error(MESSAGES.LOGIN.FAIL);
        handler.error(error);

        if (retry >= RETRY_COUNT) {
            return log.error(
                MESSAGES.LOGIN.RETRY_LIMIT);
        }

        log.warn(
            MESSAGES.LOGIN.RETRY_COUNT(
                RETRY_DELAY, 
                retry + 1, RETRY_COUNT));

        setTimeout(() => {
            this.start(retry + 1);
        }, RETRY_DELAY * 1000);
    }
}