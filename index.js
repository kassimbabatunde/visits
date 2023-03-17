const express = require("express");
const { createClient } = require("redis");

const app = express();

const client = createClient({
    url: 'redis://redis:6379'
});

(async () => {
    await client.connect();
})();

client.on('ready', ()=>{
    console.log('Connected to Redis!')
});

client.set('visits', 0);

client.on('error', err =>{ console.log('Unable to connect to Redis', err)});


app.get('/', async (req, res) =>{
    let visit = await client.get('visits', (err, visits) => {
            return visits;
        });
    client.set('visits', parseInt(visit)+1);
    res.send(`Number of visits is: ${visit}`);
    
});

const port=5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})