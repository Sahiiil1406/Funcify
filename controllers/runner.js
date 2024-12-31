const Docker = require('dockerode');
const path = require('path');
const Function=require('../models/function.js')
const docker = new Docker();

const envToCmd={
    "node:18-alpine":["node", "main.js"],
    "python":["python","main.py"]
}
const runFunction = async (req,res) => {
    try {
        const {id}=req.params;
        const func=await Function.findById(id)
        const payload = req.body;
        const hostPath = path.resolve(`/root/projects/Funcify/code/${func.uuid}`);

        // Create the container
        const container = await docker.createContainer({
            Image: func.environment, // The Docker image
            Cmd: envToCmd.func.environment, // Command to execute
            Env: [`PAYLOAD=${JSON.stringify(payload)}`], // Pass the payload as an environment variable
            HostConfig: {
                Binds: [`${hostPath}:/usr/src/app`], // Bind the host directory to the container
                AutoRemove: true // Automatically remove container after it exits
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

        // Listen for the end of logs
        logStream.on('end', () => {
            console.log(`Container Output:\n${logOutput.trim()}`);
            res.send(logOutput.trim())
        });

    } catch (error) {
        console.error("Error running container:", error);
    }
};
module.exports={
    runFunction
}
