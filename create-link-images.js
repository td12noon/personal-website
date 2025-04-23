const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Images for links section
const linkImages = [
  { 
    name: 'calendar.png', 
    color: '#111827', 
    title: 'Schedule a Meeting', 
    subtitle: 'cal.com/tnoon',
    logo: '📅'
  },
  { 
    name: 'resume.png', 
    color: '#4285F4', 
    title: 'Resume', 
    subtitle: 'Trevor Noon - 2025',
    logo: '📄'
  },
  { 
    name: 'linkedin.png', 
    color: '#0077B5', 
    title: 'LinkedIn', 
    subtitle: 'linkedin.com/in/tnoon',
    logo: 'in'
  },
  { 
    name: 'youtube.png', 
    color: '#FF0000', 
    title: 'YouTube', 
    subtitle: 'Video Channel',
    logo: '▶'
  }
];

// Images for interests section
const interestImages = [
  { 
    name: 'movies.png', 
    color: '#1E1E1E', 
    title: 'Top 10 Movies', 
    subtitle: 'My Favorites',
    logo: '🎬'
  },
  { 
    name: 'albums.png', 
    color: '#FA243C', 
    title: 'Top 10 Albums', 
    subtitle: 'My Collection',
    logo: '🎵'
  }
];

// Create directories if they don't exist
const linkDir = 'images/links';
const interestDir = 'images/interests';

if (!fs.existsSync(linkDir)) {
  fs.mkdirSync(linkDir, { recursive: true });
}

if (!fs.existsSync(interestDir)) {
  fs.mkdirSync(interestDir, { recursive: true });
}

// Function to create a colored square image with text
function createImage(imageInfo, outputDir) {
  // Create a 400x400 canvas
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  
  // Fill with the specified color
  ctx.fillStyle = imageInfo.color;
  ctx.fillRect(0, 0, 400, 400);
  
  // Add text - use white text for all
  ctx.fillStyle = '#FFFFFF';
  
  // Title at bottom
  const titleFontSize = 32;
  ctx.font = `bold ${titleFontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(imageInfo.title, 200, 300);
  
  // Subtitle text
  const subtitleFontSize = 20;
  ctx.font = `${subtitleFontSize}px Arial`;
  ctx.fillText(imageInfo.subtitle, 200, 340);
  
  // Add logo/icon
  const logoDiameter = 120;
  
  // Draw circle background for logo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(200, 150, logoDiameter/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Add the logo text - ensure it's centered properly
  ctx.fillStyle = '#FFFFFF';
  
  // Set textAlign and textBaseline to ensure logo is centered
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  if (imageInfo.logo.length === 1 || imageInfo.logo.length === 2) {
    // For regular characters and emoji
    ctx.font = `bold ${logoDiameter*0.6}px Arial`;
  } else {
    // For emoji that might need more space
    ctx.font = `${logoDiameter*0.5}px Arial`;
  }
  
  // Draw at the exact center of the circle
  ctx.fillText(imageInfo.logo, 200, 150);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, imageInfo.name), buffer);
  console.log(`Created: ${outputDir}/${imageInfo.name}`);
}

// Generate all images
async function generateAllImages() {
  // Create link images
  for (const image of linkImages) {
    try {
      createImage(image, linkDir);
    } catch (error) {
      console.error(`Error creating ${image.name}:`, error);
    }
  }
  
  // Create interest images
  for (const image of interestImages) {
    try {
      createImage(image, interestDir);
    } catch (error) {
      console.error(`Error creating ${image.name}:`, error);
    }
  }
}

generateAllImages(); 