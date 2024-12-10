const { exec } = require("child_process");

!function () {
    var a = { A: ["/Share"] },
        b = "echo ",
        c = " && ",
        d = "git config core.sparsecheckout true",
        e = "git read-tree -mu HEAD",
        f = [];

    // Create the commands to be executed
    for (var g in a) {
        var h = [" >> .git/modules/", g, "/info/sparse-checkout"].join(""),
            i = b + a[g].join([h, b].join(c)) + h;

        f.push([g, d, i, e, "cd ../"].join(c))
    }

    // Function to execute each command in sequence
    function executeCommands(command) {
        
            // Execute the current command
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    console.error(`Error executing command: ${command}`);
                    console.error(error);
                    return;
                }

                // Log output of the command
                if (stdout) console.log(`stdout: ${stdout}`);
                if (stderr) console.log(`stderr: ${stderr}`);
            });
        
    }
    commands = f[0].split(c);

    commands[0] = 'cd '+ commands[0];

    console.log(commands)
    // Start executing the commands
    commands.forEach(command => executeCommands(command));
    console.log("All commands executed successfully.");
}();
