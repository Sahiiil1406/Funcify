#!/root/.nvm/versions/node/v20.18.1/bin/node
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


const copyFolderOrFileToCode = (sourcePath) => {
    const random = uuid.v4().slice(0, 6);
    const destinationPath = path.join(`./code/${random}`);

    // Ensure destination folder exists
    if (!fs.existsSync('./code')) {
        fs.mkdirSync('./code', { recursive: true });
    }

    // Handle if the source is a directory
    if (fs.lstatSync(sourcePath).isDirectory()) {
        const copyRecursively = (src, dest) => {
            if (fs.lstatSync(src).isDirectory()) {
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest);
                }
                const items = fs.readdirSync(src);
                items.forEach((item) => {
                    const srcItem = path.join(src, item);
                    const destItem = path.join(dest, item);
                    copyRecursively(srcItem, destItem);
                });
            } else {
                fs.copyFileSync(src, dest);
            }
        };

        // Start copying the directory
        copyRecursively(sourcePath, destinationPath);
        console.log(`Copied folder contents of ${sourcePath} to ${destinationPath}`);
    } else {
        // If the source is a file
        const destFilePath = path.join('./code', random, path.basename(sourcePath));
        fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
        fs.copyFileSync(sourcePath, destFilePath);
        console.log(`Copied file ${sourcePath} to ${destFilePath}`);
    }
};

// Get the path from command-line arguments and execute the function
if (process.argv.length < 3) {
    console.error('Please provide a file or folder path as an argument.');
    process.exit(1);
}

const sourcePath = process.argv[2];
if (!fs.existsSync(sourcePath)) {
    console.error(`The provided path "${sourcePath}" does not exist.`);
    process.exit(1);
}

copyFolderOrFileToCode(sourcePath);
