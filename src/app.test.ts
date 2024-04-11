// import './app'
import { ServerApp } from './presentation/server-app';
describe('Test app.ts', () => {

    test('should call Server.run with values', async () => {
        // process.argv = ['node', 'app.ts','-b', '10']
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];

        await import('./app');


        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            canShow: true,
            destination: 'test-destination',
            name: 'test-file'
        })
    })

})