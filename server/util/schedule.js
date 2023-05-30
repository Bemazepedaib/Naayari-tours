const schedule = require('node-schedule');

function performMutation() {
    // Your mutation logic here
    console.log('Mutation triggered!');
}

const job = schedule.scheduleJob('0 0 * * *', performMutation);