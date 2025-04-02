// import the installed libraries
require("dotenv").config()

const m = require("masto")
const axios = require("axios")

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN
})

// JokeAPI URL with the specific parameters
const JOKE_API_URL = "https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart&format=json";

async function sleepyJoke() {
    try {
        // Fetch a two-part joke with specified parameters
        let response = await axios.get(JOKE_API_URL);
        let jokeData = response.data;

        if (jokeData.type === "twopart") {
            // Setup for the joke
            let setup = `😴 *Mmm... okay... lemme think of a joke...* 🥱\n\n${jokeData.setup} ... zzz... I'll finish in a bit...`;

            // Post the setup
            let status = await masto.v1.statuses.create({
                status: setup,
                visibility: "public" 
            });

            console.log("Setup posted:", status.url);

            // Wait 10 minutes, then post the punchline
            setTimeout(async () => {
                let punchline = `...Where was I with the joke again... oh yeah ... ${jokeData.delivery} ... haha... funny, right? 💤`;

                // Post the punchline as a reply to the setup
                let reply = await masto.v1.statuses.create({
                    status: punchline,
                    visibility: "public", 
                    inReplyToId: status.id
                });

                console.log("Punchline posted:", reply.url);
            }, 600000); // 10 minutes 
        } else {
            console.log("No two-part joke found.");
        }
    } catch (error) {
        console.error("Error fetching or posting joke:", error);
    }
}

// Run sleepyJoke() every 20 minutes
setInterval(sleepyJoke, 1200000);

// Initial joke post when the bot starts
sleepyJoke();
