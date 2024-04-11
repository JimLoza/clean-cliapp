import { SaveFile } from './save-file.use-case';
import { rimraf } from 'rimraf';
import fs from 'fs';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        path: 'custom-outputs/file-destination',
        filename: 'custom-table-name'
    }

    //Cleaning up the outputs folder after each test
    afterEach(() => {
        //clean up 
        const filePathExists = fs.existsSync('outputs');
        // if (filePathExists) fs.rmSync('outputs', { recursive: true });
        if (filePathExists) rimraf('outputs');


        const customPathExists = fs.existsSync(customOptions.path);
        //Getting the root folder to delete it recursively
        const rootFolder = customOptions.path.split('/')[0]
        // if (customPathExists) fs.rmSync(rootFolder, { recursive: true });
        if (customPathExists) rimraf(rootFolder);
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'

        }
        const result = saveFile.execute(options);
        const filePath: string = 'outputs/table.txt'
        const fileExists = fs.existsSync(filePath); // Puede dar un falso positivo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });


        // expect(result).toBe(true);
        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {

        const filePath: string = `${customOptions.path}/${customOptions.filename}.txt`

        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(filePath); // Puede dar un falso positivo

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fs.readFileSync(filePath, { encoding: 'utf-8' })).toBe(customOptions.fileContent);

    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custome error message from testing') }
        )
        const result = saveFile.execute(customOptions);
        expect(result).toBeFalsy();

        //Restoring the original implementation
        mkdirSpy.mockRestore();
    });


    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        )
        const result = saveFile.execute({ fileContent: 'Hola' })
        expect(result).toBeFalsy();
        writeFileSyncSpy.mockRestore();
    })

});