const fs = require('fs');

async function fetchWebsiteCode(url) {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(url);
    const html = await response.text();

    const cssResponse = await fetch.default(url);
    const cssText = await cssResponse.text();

    const jsResponse = await fetch.default(url);
    const jsText = await jsResponse.text();

    return {
      html,
      css: cssText,
      js: jsText
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const websiteUrl = 'https://discord.com/channels/@me'; // Replace with the target website URL

// Fetch the website code
fetchWebsiteCode(websiteUrl)
  .then(({ html }) => {
    // Write the HTML code to a text file
    fs.writeFile('website_code.txt', html, err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Webpage code saved to website_code.txt');
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
