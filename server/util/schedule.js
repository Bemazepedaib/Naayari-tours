const { ApolloClient, gql, InMemoryCache, HttpLink } = require('apollo-boost');
const schedule = require('node-schedule');
const fetch = require('node-fetch')
require('dotenv').config({ path: '../../.env' })

const link = new HttpLink({
    uri: 'https://naayari-tours-backend.up.railway.app/NaayarAPI',
    fetch: fetch
})

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

const giveCoupons = gql`
    mutation {
        giveCoupons
    }
 `;

const updateDiscount = gql`
    mutation {
        updateDiscount
    }
`;

const updateLevelMembership = gql`
    mutation {
        updateLevelMembership
    }
`;

function performMutation() {
    client.mutate({ mutation: giveCoupons })
        .then(res => {
            console.log(res.data.giveCoupons)
        })
        .catch(error => {
            console.log(error.message)
        })
    client.mutate({ mutation: updateDiscount })
        .then(res => {
            console.log(res.data.updateDiscount)
        })
        .catch(error => {
            console.log(error.message)
        })
    client.mutate({ mutation: updateLevelMembership })
        .then(res => {
            console.log(res.data.updateLevelMembership)
        })
        .catch(error => {
            console.log(error.message)
        })
}

const job = schedule.scheduleJob('0 0 * * *', performMutation);