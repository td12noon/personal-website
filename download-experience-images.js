const fs = require('fs');
const https = require('https');
const path = require('path');

// These are placeholder URLs based on the screenshot upload
// In a real scenario, you'd need to provide actual URLs to the images
const experienceImages = [
  {
    name: 'woebot.png',
    url: 'https://example.com/woebot.png'
  },
  {
    name: 'ateam.png',
    url: 'https://example.com/ateam.png'
  },
  {
    name: 'microsoft.png',
    url: 'https://example.com/microsoft.png'
  },
  {
    name: 'meta.png',
    url: 'https://example.com/meta.png'
  },
  {
    name: 'openai.png',
    url: 'https://example.com/openai.png'
  },
  {
    name: 'harvard.png',
    url: 'https://example.com/harvard.png'
  },
  {
    name: 'nirvana.png',
    url: 'https://example.com/nirvana.png'
  },
  {
    name: 'tribe.png',
    url: 'https://example.com/tribe.png'
  },
  {
    name: 'amazon.png',
    url: 'https://example.com/amazon.png'
  }
];

// Since we don't have real URLs for the images uploaded in the message,
// we'll create blank placeholder images instead
function createPlaceholderImage(filename) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join('images/experience', filename);
      // Create an empty file
      fs.writeFileSync(filePath, '');
      console.log(`Created placeholder: ${filename}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

async function createAllPlaceholders() {
  for (const image of experienceImages) {
    try {
      await createPlaceholderImage(image.name);
    } catch (error) {
      console.error(`Error creating ${image.name}:`, error);
    }
  }
}

createAllPlaceholders(); 