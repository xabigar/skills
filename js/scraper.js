const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the webpage to scrape
const url = "https://tinkererway.dev/web_skill_trees/electronics_skill_tree";

// Send a GET request to the URL
axios.get(url)
    .then(response => {
        // Check if the request was successful
        if (response.status === 200) {
            // Load the HTML content using Cheerio
            const $ = cheerio.load(response.data);

            // Find all skill containers (div elements with class 'svg-wrapper')
            const skillWrappers = $('.svg-wrapper');

            // List to hold the scraped data
            const skillsData = [];

            // Iterate over each skill wrapper
            skillWrappers.each((i, wrapper) => {
                const skill = {};

                // Extract the 'data-id' attribute and convert it to an integer
                skill.id = parseInt($(wrapper).attr('data-id'));

                // Extract the text content (split it into lines)
                const textElement = $(wrapper).find('text');
                if (textElement.length) {
                    const textLines = textElement.text().trim().split("\n").join("\n");
                    skill.text = textLines;
                }

                // Extract the SVG icon URL
                const imageElement = $(wrapper).find('image');
                if (imageElement.length) {
                    skill.icon = imageElement.attr('href').split('/').pop()
                }

                skillsData.push(skill);
            });

            // Print the scraped data (or you can write it to a file)
            console.log(JSON.stringify(skillsData, null, 2));

            // Save the data to a JSON file
            fs.writeFileSync('skills_data.json', JSON.stringify(skillsData, null, 2), 'utf8');

        } else {
            console.log(`Failed to retrieve the webpage. Status code: ${response.status}`);
        }
    })
    .catch(error => {
        console.error(`Error fetching the URL: ${error}`);
    });
