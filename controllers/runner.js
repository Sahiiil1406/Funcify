const Docker = require('dockerode');
const path = require('path');
const Function = require('../models/function.js');
const docker = new Docker();

const envToCmd = {
    "node:alpine": ["node", "main.js"],
    "python:alpine": ["python", "main.py"]
};

const runFunction = async (req, res) => {
    try {
        // const {id}=req.params;
        // const func = await Function.findById(id);
        const func = {
            uuid: "hgj",
            environment: "python:alpine"
        };
        //console.log('Function:', func);

        const payload = req.body;
        const hostPath = path.resolve(`/root/projects/Funcify/code/${func.uuid}`);
        //console.log('Environment:', func.environment);

        // Create the container
        const container = await docker.createContainer({
            Image: `${func.environment}`, // Docker image
            Cmd: envToCmd[func.environment] || ["node", "main.js"], // Command to execute based on environment
            Env: [`PAYLOAD=${JSON.stringify(payload)}`], // Pass the payload as an environment variable
            HostConfig: {
                Binds: [`${hostPath}:/usr/src/app`], // Bind the host directory to the container
                AutoRemove: true // Automatically remove the container after it exits
            },
            WorkingDir: "/usr/src/app" // Set the working directory inside the container
        });

        // Start the container
        await container.start();

        // Capture and stream logs
        const logStream = await container.logs({
            stdout: true,
            stderr: true,
            follow: true
        });

        // Gather log output
        let logOutput = '';
        logStream.on('data', (chunk) => {
            logOutput += chunk.toString('utf-8');
        });

        // Handle log stream 'end' event
        logStream.on('end', () => {
            if (logOutput.trim()) {
                // Send logs back as the response
                const cleanedOutput=logOutput.replace(/[\x00-\x1F\x7F]/g, '');
                res.status(200).send({ output: String(cleanedOutput) });
            } else {
                // In case no logs, send a generic response
                res.status(200).send({ output: "No output returned from the function." });
            }
        });

        // Handle any stream errors
        logStream.on('error', (err) => {
            console.error("Log stream error:", err);
            res.status(500).send({ error: "Error fetching container logs" });
        });

    } catch (error) {
        console.error("Error running container:", error);
        res.status(500).send({ error: "Error running the container" });
    }
};

module.exports = {
    runFunction
};
