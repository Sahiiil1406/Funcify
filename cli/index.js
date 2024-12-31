#!/root/.nvm/versions/node/v20.18.1/bin/node
const inquirer = require('inquirer');
const { copyFolderOrFileToCode } = require('./copyfile.js');
const { authCli } = require('./auth.js');
const { deployFunction } = require('./deploy.js');

console.log("Funcify command line working ...");

let token = null;

async function main() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What action would you like to perform?',
            choices: ['Login', 'Copy', 'Deploy', 'Exit'],
        },
    ]);

    switch (action) {
        case 'Login':
            const { username, email } = await inquirer.prompt([
                { type: 'input', name: 'username', message: 'Enter your username:' },
                { type: 'input', name: 'email', message: 'Enter your email:' },
            ]);
            token =await authCli(username, email).token;
            break;

        case 'Copy':
            const { path } = await inquirer.prompt([
                { type: 'input', name: 'path', message: 'Enter the path to copy from:' },
            ]);
            copyFolderOrFileToCode(path);
            break;

        case 'Deploy':
            const { id } = await inquirer.prompt([
                { type: 'input', name: 'id', message: 'Enter the function ID to deploy:' },
            ]);
            if (token) {
                await deployFunction(id);
            } else {
                console.log("Please log in first!");
            }
            break;

        case 'Exit':
            console.log("Exiting CLI. Goodbye!");
            process.exit(0);
    }

    main(); // Loop for continuous usage
}

main();
