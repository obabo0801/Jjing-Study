import { MESSAGES } from '#i18n'
import * as log from '#utils/log';
import { AsyncLocalStorage } from 'async_hooks';

const handlers = new WeakMap();
const scopes = new AsyncLocalStorage();

const interactions = [
    ['chatInputCommand', i => i.isChatInputCommand()],
    ['autocomplete', i => i.isAutocomplete()],
    ['button', i => i.isButton()],
    ['stringSelectMenu', i => i.isStringSelectMenu()],
    ['modalSubmit', i => i.isModalSubmit()],
];

export async function interaction(client, i) {
    try {
        for (const [event, check] of interactions) {
            if (check(i)) return await emit(client, event, i);
        }
    } catch (e) {
        error(e);
    }
}

export async function message(client, m) {
    try {
        if (!m.content.startsWith('!')) {
            return;
        }

        const name = m.content
            .slice(1)
            .trim()
            .split(/\s+/)
            .shift()
            ?.toLowerCase();

        await emit(client, 'message', name, m.content, m);
    } catch (e) {
        error(e);
    }
}

export function register(client, callback) {
    return scopes.run(client, callback);
}

export function on(name, callback) {
    const client = scopes.getStore();
    if (!client) {
        throw new Error('Event handlers must be registered by a client.');
    }
    const events = handlers.get(client) ?? [];
    events.push([name, callback]);
    handlers.set(client, events);
}

export async function emit(client, name, ...args) {
    for (const [event, callback] of handlers.get(client) ?? []) {
        if (event === name) {
            await callback(...args);
        }
    }
}

export function clear(client) {
    if (client) handlers.delete(client);
}

export function error(error) {
    const errors = [
        ['ERR_OSSL_UNSUPPORTED', MESSAGES.AUTH.INVALID],

        ['ENOTFOUND', MESSAGES.LOGIN.ENOTFOUND],
        ['TokenInvalid', MESSAGES.LOGIN.TOKEN_INVALID],

        [400, MESSAGES.SHEET.ERROR400],
        [401, MESSAGES.SHEET.ERROR401],
        [403, MESSAGES.SHEET.ERROR403],
        [404, MESSAGES.SHEET.ERROR404],
        [423, MESSAGES.SHEET.ERROR423],
        [500, MESSAGES.SHEET.ERROR500],

        [50001, MESSAGES.COMMAND.MISSING_ACCESS],
        [50035, MESSAGES.ERROR.BODY_INVALID],
        [10002, MESSAGES.COMMAND.CLIENT_INVALID],
        [10004, MESSAGES.GUILD.INVALID],
    ];

    for (const [code, message] of errors) {
        if (error?.code === code) {
            return log.error(message);
        }
    }
    

    if (error?.message === 'Used disallowed intents') {
        return log.error(
            MESSAGES.LOGIN.DISALLOWED_INTENTS);
    }

    if (error instanceof Error) {
        return log.error(error.message);
    }

    if (error) {
        return log.error(error)
    }
}
