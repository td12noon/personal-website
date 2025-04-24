const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Images with their company names and roles
const imageData = [
  { 
    name: 'woebot.png', 
    company: 'Woebot', 
    title: 'Senior Product Manager'
  },
  { 
    name: 'ateam.png', 
    company: 'A.Team', 
    title: 'Product Lead'
  },
  { 
    name: 'microsoft.png', 
    company: 'Microsoft', 
    title: 'Confidential AI Project'
  },
  { 
    name: 'meta.png', 
    company: 'Meta', 
    title: 'Confidential AI Project'
  },
  { 
    name: 'openai.png', 
    company: 'OpenAI', 
    title: 'Confidential AI Project'
  },
  { 
    name: 'harvard.png', 
    company: 'Harvard', 
    title: 'Statistics & Astrophysics'
  },
  { 
    name: 'nirvana.png', 
    company: 'Nirvana', 
    title: 'First Product Manager'
  },
  { 
    name: 'tribe.png', 
    company: 'Tribe AI', 
    title: 'AI Product Manager'
  },
  { 
    name: 'amazon.png', 
    company: 'Amazon', 
    title: 'Technical Product Manager'
  }
];

// Function to load an image and add text
async function addTextToImage(imageInfo) {
  try {
    const dir = 'images/experience';
    const filePath = path.join(dir, imageInfo.name);
    
    // Load the existing image
    const image = await loadImage(filePath);
    
    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    
    // Draw the original image
    ctx.drawImage(image, 0, 0);
    
    // Add text at the bottom
    const fontSize = image.width * 0.08;
    const smallerFontSize = fontSize * 0.7;
    
    // Company name - large white text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(imageInfo.company, image.width / 2, image.height * 0.8);
    
    // Job title - smaller white text
    ctx.font = `${smallerFontSize}px Arial`;
    ctx.fillText(imageInfo.title, image.width / 2, image.height * 0.9);
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, buffer);
    console.log(`Added text to: ${imageInfo.name}`);
  } catch (error) {
    console.error(`Error processing ${imageInfo.name}:`, error);
  }
}

// Add text to all images
async function processAllImages() {
  for (const image of imageData) {
    await addTextToImage(image);
  }
}

// Run the script
processAllImages(); 