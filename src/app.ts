import { yarg } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
    await main();
})()

async function main() {

    const { b: base, l: limit, s: canShow, d: destination, n: name } = yarg;
    ServerApp.run({ base, limit, canShow, destination, name });

}