import { SlashCommandBuilder } from 'discord.js';

export default {
    name: 'sample',

    commands: [
        new SlashCommandBuilder()
            .setName('sample')
            .setDescription('sample test')
    ],

    customId: [
        'sample_btn'
    ],

    // 명령어
    async slash(i) {},

    // 자동완성
    async auto(i) {},

    // 버튼
    async button(i) {},

    // 메뉴
    async menu(i) {},

    // 모달
    async modal(i) {},

    // 메세지
    async message(m) {}
}