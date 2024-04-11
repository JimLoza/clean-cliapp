import path from 'path';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';
describe('Server App', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    })

    const options = {
        base: 5,
        limit: 10,
        canShow: false,
        destination: 'test-desination',
        name: 'test-filename'
    }


    test('Shoul create ServerApp instance', () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    })

    test('Should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const tableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')


        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledWith('ServerApp running...');
        // expect(logSpy).toHaveBeenCalledWith('File created!');
        expect(logSpy).toHaveBeenLastCalledWith('File created!');

        expect(tableSpy).toHaveBeenCalledTimes(1);
        expect(tableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });


        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            path: options.destination,
            filename: options.name
        });

    })


    test('Should run with custom vlues mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2'); // mock return values from CreateTable use case
        const saveFileMock = jest.fn().mockReturnValue(true); // true means that the file was created


        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('ServerApp running...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            path: options.destination,
            filename: options.name
        });
        expect(logMock).toHaveBeenLastCalledWith('File created!');
        expect(logErrorMock).not.toHaveBeenCalled();

    })
})