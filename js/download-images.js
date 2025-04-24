const fs = require('fs');
const https = require('https');
const path = require('path');

const imageUrls = [
    'https://lh3.googleusercontent.com/a/AEdFTp5sHz6-D4_X7sCqghePMpjGrKVGsaszqkCNk_H7GS8=s512-c',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/VG8sF2taU3sqovzg-Bento%2520-%2520tribe.png?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/HJxjoFJJ8JeTWB41-Bento%2520-%2520ateam.png?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/NksFn6PDc6FLMb6Y-Bento%2520-%2520Amazon.png?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/0GAvCuLGDcfXZKIf-Bento%2520-%2520Default.png?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/m4L2BuJlj6drB3EH-Bento%2520-%2520Harvard.png?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/wSSSbBBLWtm11zer-Bento%2520-%2520Harvard.png?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/5TVxFq86i0CTlphS-IMG_0239.jpeg?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/WHfHeHEA9gt03EPC-IMG_2771.jpeg?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/h8H32yrdgzE0yjjR-IMG_4664.jpeg?w=750&h=750',
    'https://creatorspace.imgix.net/users/cle5quafx00cko20yzpkblnn5/2lKfQIwkDWe7gv6T-IMG_1470.jpeg?w=750&h=750'
];

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }

            const filePath = path.join('images', filename);
            const fileStream = fs.createWriteStream(filePath);
            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function downloadAllImages() {
    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const filename = `image_${i + 1}${url.includes('.jpeg') ? '.jpeg' : '.png'}`;
        try {
            await downloadImage(url, filename);
        } catch (error) {
            console.error(`Error downloading ${filename}:`, error);
        }
    }
}

downloadAllImages(); 