import fs from 'fs';

export interface SaveFileUseCase {
    execute: (file: Options) => boolean;
}

export interface Options {
    fileContent: string;
    path?: string;
    filename?: string
}


export class SaveFile implements SaveFileUseCase {
    constructor(
        /**
         * Repository: StorageRepository 
         **/
    ) { }

    execute({
        fileContent,
        path = 'outputs',
        filename = 'table'
    }: Options): boolean {

        try {
            // Create the outputs folder if it doesn't exist
            fs.mkdirSync(path, { recursive: true });

            // Write the file
            fs.writeFileSync(`${path}/${filename}.txt`, fileContent);
            return true
        } catch (error) {
            console.log('Error creating the file', error);
            return false
        }
    }
}