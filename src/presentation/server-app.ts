import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    canShow: boolean;
    destination: string;
    name: string;

}

export class ServerApp {
    static run({ base, limit, canShow, destination, name }: RunOptions) {
        console.log('ServerApp running...');

        const table = new CreateTable().execute({ base, limit });

        const wasCreated = new SaveFile().execute({
            fileContent: table,
            path: destination,
            filename: name
        });


        if (canShow) console.log(table);

        wasCreated ? console.log('File created!') : console.log('Error creating the file');

    }
}