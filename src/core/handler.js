import { MESSAGES } from '#message'
import * as log from '#log';

export function error(e) {
    if (e.code === 'TokenInvalid') {
        return log.error(
            MESSAGES.LOGIN.TOKEN_INVALID);
    }

    else if (e.code === 50001) {
        return log.error(
            MESSAGES.COMMAND.MISSING_ACCESS);
    }

    else if (e.code === 50035) {
        return log.error(
            MESSAGES.ERROR.BODY_INVALID);
    }

    else if (e.code === 10002) {
        return log.error(
            MESSAGES.COMMAND.CLIENT_INVALID);
    }

    else if (e.code === 10004) {
        return log.error(
            MESSAGES.GUILD.GUILD_INVALID);
    }

    else if (e.message === 'Used disallowed intents') {
        return log.error(
            MESSAGES.LOGIN.DISALLOWED_INTENTS);
    }

    else if (e instanceof Error) {
        return log.error(e.message);
    }

    else if (e) {
        return log.error(String(e))
    }
}