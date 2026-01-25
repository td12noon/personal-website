#!/usr/bin/env node

/**
 * Generate Portal Password Hash
 *
 * Usage: node scripts/generate-portal-hash.js "your-password"
 *
 * Copy the output and add it to Vercel as PORTAL_PASSWORD_HASH
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
    console.log('\n  Usage: node scripts/generate-portal-hash.js "your-password"\n');
    console.log('  Example: node scripts/generate-portal-hash.js "mysecretcode"\n');
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log('\n========================================');
console.log('  PORTAL PASSWORD HASH GENERATED');
console.log('========================================\n');
console.log('  Password:', password);
console.log('  Hash:    ', hash);
console.log('\n----------------------------------------');
console.log('  Add this to Vercel Environment Variables:');
console.log('----------------------------------------\n');
console.log('  Name:  PORTAL_PASSWORD_HASH');
console.log('  Value:', hash);
console.log('\n  Also make sure to set JWT_SECRET to a random string.\n');
