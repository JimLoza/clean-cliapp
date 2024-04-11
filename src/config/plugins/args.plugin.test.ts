const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
}

describe('Test args.pluign.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5'])
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    });

    test('Should return configurtaion with custom values', async () => {
        const argv = await runCommand(['-b', '30', '-l', '20', '-s', '-n', 'multiplication-table-test', '-d', 'test-files/outputs'])
        expect(argv).toEqual(expect.objectContaining({
            b: 30,
            l: 20,
            s: true,
            n: 'multiplication-table-test',
            name: 'multiplication-table-test',
            d: 'test-files/outputs',
        }));
    });
});