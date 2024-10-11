const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Base URL for the icons
const baseUrl = "https://tinkererway.dev/web_skill_trees_resources/svg/electronics_icons/";

// Directory to save the downloaded icons
const saveDirectory = path.join(__dirname, 'icons');

// Create the directory if it doesn't exist
if (!fs.existsSync(saveDirectory)) {
    fs.mkdirSync(saveDirectory, { recursive: true });
}

// Number of icons to download (1 to 67)
const downloadIcons = async () => {
    for (let i = 1; i <= 67; i++) {
        // Construct the full URL for each icon
        const iconUrl = `${baseUrl}icon${i}.svg`;

        try {
            // Send a GET request to download the icon
            const response = await axios.get(iconUrl, { responseType: 'arraybuffer' });

            // Save the icon to the local directory
            const iconPath = path.join(saveDirectory, `icon${i}.svg`);
            fs.writeFileSync(iconPath, response.data);
            console.log(`Downloaded: ${iconPath}`);
        } catch (error) {
            console.error(`Failed to download: ${iconUrl} (Error: ${error.response?.status || error.message})`);
        }
    }

    console.log("All icons downloaded.");
};

// Run the download process
downloadIcons();