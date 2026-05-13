import { config } from 'dotenv';
config({ quiet: true });

import * as discord from './services/discord/index.js';
import * as google from './services/google/index.js';

import * as cli from './core/cli.js';
import { parseEnv } from './core/env.js';

import * as log from '#log';
import * as file from '#file';
import { MESSAGES } from '#i18n';

function printTitle() {
    log.title(`
   ▄▄▄    ▄▄▄  ▄▄▄▄▄  ▄▄   ▄   ▄▄▄ 
     █      █    █    █▀▄  █ ▄▀   ▀
     █      █    █    █ █▄ █ █   ▄▄
     █      █    █    █  █ █ █    █
 ▀▄▄▄▀  ▀▄▄▄▀  ▄▄█▄▄  █   ██  ▀▄▄▄▀ 🐕`)
}

(async () => {
    printTitle();
    parseEnv('.env', false);
    await discord.setup();
    await google.setup();

    await cli.start([
        { name: 'ALL' },
        { name: 'DISCORD', ref: discord },
        { name: 'GOOGLE', ref: google }
    ]);

})();