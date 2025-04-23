const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Images with their associated colors and names
const imageData = [
  { name: 'woebot.png', color: '#003399', company: 'Woebot', role: 'Senior Product Manager' },
  { name: 'ateam.png', color: '#F8E1ED', company: 'A.Team', role: 'Product Lead', textColor: '#000000' },
  { name: 'microsoft.png', color: '#000000', company: 'Microsoft', role: 'Confidential AI Project' },
  { name: 'meta.png', color: '#1877F2', company: 'Meta', role: 'Confidential AI Project' },
  { name: 'openai.png', color: '#10A37F', company: 'OpenAI', role: 'Confidential AI Project' },
  { name: 'harvard.png', color: '#A51C30', company: 'Harvard', role: 'Statistics & Astrophysics' },
  { name: 'nirvana.png', color: '#2E1A47', company: 'Nirvana', role: 'First Product Manager' },
  { name: 'tribe.png', color: '#5B4CFF', company: 'Tribe AI', role: 'AI Product Manager' },
  { name: 'amazon.png', color: '#FF9900', company: 'Amazon', role: 'Technical Product Manager', textColor: '#000000' }
];

// Create a directory if it doesn't exist
const dir = 'images/experience';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Function to create a colored square image with text
function createImage(imageInfo) {
  // Create a 400x400 canvas
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  
  // Fill with the specified color
  ctx.fillStyle = imageInfo.color;
  ctx.fillRect(0, 0, 400, 400);
  
  // Add text
  ctx.fillStyle = imageInfo.textColor || '#FFFFFF'; // Default to white text
  
  // Company name at bottom
  const companyFontSize = 32;
  ctx.font = `bold ${companyFontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(imageInfo.company, 200, 300);
  
  // Role text
  const roleFontSize = 20;
  ctx.font = `${roleFontSize}px Arial`;
  ctx.fillText(imageInfo.role, 200, 340);
  
  // Add simple logo/icon for each company (using first letter)
  const logoDiameter = 120;
  
  // Draw circle background for logo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(200, 150, logoDiameter/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Add the first letter of company name as the logo
  ctx.fillStyle = imageInfo.textColor || '#FFFFFF';
  ctx.font = `bold ${logoDiameter*0.6}px Arial`;
  ctx.fillText(imageInfo.company.charAt(0), 200, 150);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(dir, imageInfo.name), buffer);
  console.log(`Created: ${imageInfo.name}`);
}

// Generate all images
async function generateAllImages() {
  for (const image of imageData) {
    try {
      createImage(image);
    } catch (error) {
      console.error(`Error creating ${image.name}:`, error);
    }
  }
}

generateAllImages(); 