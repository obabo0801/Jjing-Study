import readline from 'readline';
import * as log from '#log';
import { locales, MESSAGES } from '#i18n';
import { exit } from 'process';

let services = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''});

async function selectMenu(all, single, target) {
    log.prompt('───────────────────────────────────────\n');
    for (const [id, item] of target.ref.get().entries()) {
        log.prompt(await target.ref.info(id, true));
    }
    log.prompt('\n───────────────────────────────────────')
    const input = await ask(resolve => {
        rl.question('', resolve);
    });
    const [i1, ...i2] = input.split(' ');
    const index = Number(i1);
    const args = [...new Set(i2.map(Number))];

    await service(all, single, index, ...args);
}

async function select(all, single) {
    log.prompt('───────────────────────────────────────\n')
    await showAll(services);
    log.prompt('\n───────────────────────────────────────')
    const input = await ask(resolve => {
        rl.question('', resolve);
    });
    const [i1, ...i2] = input.split(' ');
    const index = Number(i1);
    const args = [...new Set(i2.map(Number))];

    if (index === 0) {
        await service(all, single, index, ...args);
    }

    const target = services[index];
    if (!target) return;
    selectMenu(all, single, target);
}

async function service(all, single, index, ...args) {
    if (Number.isNaN(index)) {
        await select(all, single);
        return;
    }
    if (index === 0) {
        for (const service of services) {
            const ref = service.ref;
            if (!ref?.[all]) continue;
            await ref[all]();
        }
    }
    const target = services[index];
    if (!target) return;
    if (args.length === 0) {
        await target.ref?.[all]?.();
        return;
    }
    for (const arg of args) {
        if (Number.isNaN(arg)) continue;
        await target.ref?.[single]?.(arg);
    }
}

async function handler(input) {
    const [cmd, i1, ...i2] = input.split(' ');
    const index = Number(i1);
    const args = [...new Set(i2.map(Number))];

    switch (cmd.toLowerCase()) {

    case locales.en.CLI.COMMANDS.START:
    case locales.ko.CLI.COMMANDS.START: {
        log.cmd(MESSAGES.LOGIN.ATTEMPT);
        await service('startAll', 'start', index, ...args);
        break;
    }

    case locales.en.CLI.COMMANDS.RESTART:
    case locales.ko.CLI.COMMANDS.RESTART: {
        log.cmd(MESSAGES.LOGIN.RESTART);
        await service('restartAll', 'restart', index, ...args);
        break;
    }

    case locales.en.CLI.COMMANDS.STOP:
    case locales.ko.CLI.COMMANDS.STOP: {
        log.cmd(MESSAGES.LOGOUT.ATTEMPT);
        await service('stopAll', 'stop', index, ...args);
        break;
    }

    case locales.en.CLI.COMMANDS.STATUS:
    case locales.ko.CLI.COMMANDS.STATUS: {
        log.cmd(MESSAGES.STATUS.ATTEMPT);
        await service('statusAll', 'status', index, ...args);
        break;
    }

    case locales.en.CLI.COMMANDS.REFRESH:
    case locales.ko.CLI.COMMANDS.REFRESH: {
        log.cmd(MESSAGES.REFRESH.ATTEMPT);
        await service('refreshAll', 'refresh', index, ...args);
        break;
    }

    case locales.en.CLI.COMMANDS.CLEAR:
    case locales.ko.CLI.COMMANDS.CLEAR: {
        log.clear();
        break;
    }

    case locales.en.CLI.COMMANDS.EXIT:
    case locales.ko.CLI.COMMANDS.EXIT: {
        shutdown();
        break;
    }

    default:
        unknown(cmd);
        break;
    }
}

rl.on('line', async (input) => {
    const cmd = input.trim();
    await handler(cmd);
});

async function showAll(items) {
    for (const [id, item] of items.entries()) {
        if (!item.name) continue;
        const name = MESSAGES.CLI[item.name];
        log.prompt(`${id}.`, name);
    }
}

export async function start(items) {
    services = items;

    log.prompt('───────────────────────────────────────\n')
    await showAll(services);
    log.prompt('\n───────────────────────────────────────')
    log.prompt(MESSAGES.CLI.COMMAND);
    log.prompt(format(MESSAGES.CLI.COMMANDS));
    log.prompt('───────────────────────────────────────')
}

function format(commands, column = 7, rows = []) {
    const values = Object.values(commands);
    for (let i = 0; i < values.length; i += column) {
        rows.push(values.slice(i, i + column).join(' '));
    }; return rows.join('\n');
}

export function prompt() {
    if (!rl.closed) rl.prompt();
}

export function pause() {
    if (!rl.closed) rl.pause();
}

export function close() {
    if (!rl.closed) rl.close();
}

export function unknown(cmd) {
    log.warn(`❓ '${cmd}' `
        + MESSAGES.SYSTEM.UNKNOWN);
}

export function ask(resolve) {
    return new Promise(resolve);
}

export function shutdown() {
    log.cmd(MESSAGES.SYSTEM.QUIT);
    process.exit(0);
}

process.on('uncaughtException', (err) => {
    log.error(err?.stack || err);
});

process.on('unhandledRejection', (reason) => {
    log.error(reason?.stack || reason);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);