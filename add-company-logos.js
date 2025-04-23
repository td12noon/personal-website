const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Images with their logo shapes
const imageData = [
  { name: 'woebot.png', logoFunction: drawRobotFace },
  { name: 'ateam.png', logoFunction: drawALetter },
  { name: 'microsoft.png', logoFunction: drawWindowsLogo },
  { name: 'meta.png', logoFunction: drawInfinityLogo },
  { name: 'openai.png', logoFunction: drawFlowerLogo },
  { name: 'harvard.png', logoFunction: drawShieldLogo },
  { name: 'nirvana.png', logoFunction: drawFlowerSymbol },
  { name: 'tribe.png', logoFunction: drawDiamondLogo },
  { name: 'amazon.png', logoFunction: drawAmazonSmile }
];

// Function to load an image and add a logo
async function addLogoToImage(filename, logoFunction) {
  try {
    const dir = 'images/experience';
    const filePath = path.join(dir, filename);
    
    // Load the existing image
    const image = await loadImage(filePath);
    
    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    
    // Draw the original image
    ctx.drawImage(image, 0, 0);
    
    // Draw the logo
    logoFunction(ctx, image.width, image.height);
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, buffer);
    console.log(`Added logo to: ${filename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

// Logo drawing functions
function drawRobotFace(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2 - 30;
  const size = width * 0.3;
  
  // Robot head
  ctx.fillStyle = '#FFCC00';
  ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
  
  // Eyes
  ctx.fillStyle = '#00CCFF';
  ctx.beginPath();
  ctx.arc(centerX - size/4, centerY - size/6, size/8, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(centerX + size/4, centerY - size/6, size/8, 0, Math.PI * 2);
  ctx.fill();
  
  // Mouth
  ctx.fillStyle = '#FFCC00';
  ctx.fillRect(centerX - size/3, centerY + size/6, size*2/3, size/6);
  
  // Antenna
  ctx.strokeStyle = '#888888';
  ctx.lineWidth = size/15;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size/2);
  ctx.lineTo(centerX, centerY - size);
  ctx.stroke();
}

function drawALetter(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.4;
  
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size/2);
  ctx.lineTo(centerX - size/2, centerY + size/2);
  ctx.lineTo(centerX + size/2, centerY + size/2);
  ctx.closePath();
  ctx.fill();
  
  // Add gradient
  const gradient = ctx.createLinearGradient(centerX - size/2, centerY, centerX + size/2, centerY);
  gradient.addColorStop(0, '#FF7E00');
  gradient.addColorStop(1, '#FF0000');
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = size/10;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size/2);
  ctx.lineTo(centerX - size/2, centerY + size/2);
  ctx.lineTo(centerX + size/2, centerY + size/2);
  ctx.closePath();
  ctx.stroke();
}

function drawWindowsLogo(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.3;
  const gap = size * 0.05;
  const quadSize = (size - gap) / 2;
  
  // Top left - red
  ctx.fillStyle = '#F25022';
  ctx.fillRect(centerX - size/2, centerY - size/2, quadSize, quadSize);
  
  // Top right - green
  ctx.fillStyle = '#7FBA00';
  ctx.fillRect(centerX - size/2 + quadSize + gap, centerY - size/2, quadSize, quadSize);
  
  // Bottom left - blue
  ctx.fillStyle = '#00A4EF';
  ctx.fillRect(centerX - size/2, centerY - size/2 + quadSize + gap, quadSize, quadSize);
  
  // Bottom right - yellow
  ctx.fillStyle = '#FFB900';
  ctx.fillRect(centerX - size/2 + quadSize + gap, centerY - size/2 + quadSize + gap, quadSize, quadSize);
}

function drawInfinityLogo(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.4;
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = size/5;
  
  // Draw infinity symbol
  ctx.beginPath();
  ctx.moveTo(centerX - size/2, centerY);
  ctx.bezierCurveTo(
    centerX - size/2, centerY - size/3,
    centerX - size/6, centerY - size/3,
    centerX, centerY
  );
  ctx.bezierCurveTo(
    centerX + size/6, centerY + size/3,
    centerX + size/2, centerY + size/3,
    centerX + size/2, centerY
  );
  ctx.bezierCurveTo(
    centerX + size/2, centerY - size/3,
    centerX + size/6, centerY - size/3,
    centerX, centerY
  );
  ctx.bezierCurveTo(
    centerX - size/6, centerY + size/3,
    centerX - size/2, centerY + size/3,
    centerX - size/2, centerY
  );
  ctx.stroke();
}

function drawFlowerLogo(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.3;
  
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = size/10;
  
  // Draw the hexagon shapes
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerX + size/2 * Math.cos(angle);
    const y = centerY + size/2 * Math.sin(angle);
    
    ctx.beginPath();
    for (let j = 0; j < 6; j++) {
      const pointAngle = (Math.PI / 3) * j + Math.PI / 6;
      const px = x + size/4 * Math.cos(pointAngle);
      const py = y + size/4 * Math.sin(pointAngle);
      
      if (j === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
}

function drawShieldLogo(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.25;
  
  // Shield outline
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size);
  ctx.lineTo(centerX + size, centerY - size/2);
  ctx.lineTo(centerX + size, centerY + size/2);
  ctx.lineTo(centerX, centerY + size);
  ctx.lineTo(centerX - size, centerY + size/2);
  ctx.lineTo(centerX - size, centerY - size/2);
  ctx.closePath();
  ctx.fill();
  
  // Shield border
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = size/15;
  ctx.stroke();
  
  // Books
  ctx.fillStyle = '#A51C30';
  ctx.font = `bold ${size/2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', centerX, centerY);
}

function drawFlowerSymbol(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.3;
  
  ctx.fillStyle = '#FFFFFF';
  
  // Draw petals
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerX + size/2 * Math.cos(angle);
    const y = centerY + size/2 * Math.sin(angle);
    
    ctx.beginPath();
    ctx.ellipse(x, y, size/4, size/8, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw center
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(centerX, centerY, size/6, 0, Math.PI * 2);
  ctx.fill();
}

function drawDiamondLogo(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.25;
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = size/8;
  
  // Draw two overlapping diamonds
  ctx.beginPath();
  ctx.moveTo(centerX - size, centerY);
  ctx.lineTo(centerX, centerY - size);
  ctx.lineTo(centerX + size, centerY);
  ctx.lineTo(centerX, centerY + size);
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(centerX - size*0.6, centerY);
  ctx.lineTo(centerX, centerY - size*0.6);
  ctx.lineTo(centerX + size*0.6, centerY);
  ctx.lineTo(centerX, centerY + size*0.6);
  ctx.closePath();
  ctx.stroke();
}

function drawAmazonSmile(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = width * 0.4;
  
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('a', centerX, centerY);
  
  // Draw the smile
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = size/15;
  ctx.beginPath();
  ctx.moveTo(centerX - size/3, centerY + size/3);
  ctx.quadraticCurveTo(centerX, centerY + size/2, centerX + size/3, centerY + size/3);
  ctx.stroke();
  
  // Draw the arrow
  ctx.beginPath();
  ctx.moveTo(centerX - size/3, centerY + size/3);
  ctx.lineTo(centerX + size/3, centerY + size/3);
  ctx.lineTo(centerX + size/6, centerY + size/6);
  ctx.stroke();
}

// Add logos to all images
async function processAllImages() {
  for (const image of imageData) {
    await addLogoToImage(image.name, image.logoFunction);
  }
}

// Run the script
processAllImages(); 