import { config } from 'dotenv';
import readline from 'readline';
import { JjingBot } from '#client';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () => {
    config({ quiet: true });

    const client = new JjingBot();

    client.config({
        name: 'Jjing-Bot 🐕',
        path: 'src/commands',

        token: process.env.DISCORD_TOKEN,
        status: process.env.DISCORD_STATUS,
        
        clientId: process.env.CLIENT_ID,
        guildId: process.env.GUILD_ID,
    });

    await client.start();
})();

rl.on('line', async (input) => {
    const cmd = input.trim();

    switch (cmd) {
        case 'refresh':
            console.log('refresh');
            break;
    
        case 'exit':
            process.exit(0);
    }
});