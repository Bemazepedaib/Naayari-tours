const { ApolloClient, gql, InMemoryCache, HttpLink } = require('apollo-boost');
const schedule = require('node-schedule');
require('dotenv').config({ path: '../../.env' })

const link = new HttpLink({
    uri: 'http://localhost:4000/NaayarAPI'
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

function performMutation() {
    client.mutate({ mutation: giveCoupons })
        .then(res => {
            console.log(res.data.giveCoupons)
        })
        .catch(error => {
            console.log(error.message)
        })
}

const job = schedule.scheduleJob('* * * * * *', performMutation);