const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Images with their associated colors (matching the screenshots)
const imageData = [
  { name: 'woebot.png', color: '#003399' },     // Blue for Woebot
  { name: 'ateam.png', color: '#F8E1ED' },      // Light pastel for A.Team
  { name: 'microsoft.png', color: '#000000' },  // Black for Microsoft
  { name: 'meta.png', color: '#1877F2' },       // Blue for Meta
  { name: 'openai.png', color: '#10A37F' },     // Green for OpenAI
  { name: 'harvard.png', color: '#A51C30' },    // Crimson for Harvard
  { name: 'nirvana.png', color: '#2E1A47' },    // Purple for Nirvana
  { name: 'tribe.png', color: '#5B4CFF' },      // Purple-blue for Tribe
  { name: 'amazon.png', color: '#FF9900' }      // Orange for Amazon
];

// Create a directory if it doesn't exist
const dir = 'images/experience';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Function to create a colored square image
function createColoredImage(filename, color) {
  // Create a 400x400 canvas
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  
  // Fill with the specified color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 400, 400);
  
  // Get company name without extension
  const companyName = path.basename(filename, path.extname(filename));
  
  // Add text (company name)
  ctx.fillStyle = getContrastColor(color);
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(companyName.toUpperCase(), 200, 200);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(dir, filename), buffer);
  console.log(`Created: ${filename}`);
}

// Function to determine contrasting text color (black or white)
function getContrastColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors, white for dark
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// Generate all images
async function generateAllImages() {
  for (const image of imageData) {
    try {
      createColoredImage(image.name, image.color);
    } catch (error) {
      console.error(`Error creating ${image.name}:`, error);
    }
  }
}

generateAllImages(); 