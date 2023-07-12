const { request } = require('graphql-request');
const schedule = require('node-schedule');
require('dotenv').config({ path: '../../.env' });

const endpoint = process.env.ENDPOINT

const giveCoupons = `
    mutation {
        giveCoupons
    }
 `;

const updateDiscount = `
    mutation {
        updateDiscount
    }
`;

const updateLevelMembership = `
    mutation {
        updateLevelMembership
    }
`;

async function performMutation() {
    try {
        const res = await request(endpoint, giveCoupons)
        console.log(res.giveCoupons)
    } catch (error) {
        console.log(error.message)
    }
    try {
        const res = await request(endpoint, updateDiscount)
        console.log(res.updateDiscount)
    } catch (error) {
        console.log(error.message)
    }
    try {
        const res = await request(endpoint, updateLevelMembership)
        console.log(res.updateLevelMembership)
    } catch (error) {
        console.log(error.message)
    }
}

const job = schedule.scheduleJob('0 0 * * *', performMutation);