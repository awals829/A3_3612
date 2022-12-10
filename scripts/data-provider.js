// ==================================
// =          Requirements          =
// ==================================
const path = require('path');
const fs = require('fs');

// ====================================
// =          Main Directory          =
// ====================================
const mainDir = path.join(__dirname, '/..');

// ===========================
// =          Paths          =
// ===========================
const artistPath = path.join(mainDir, "/data/artists.json");
const galleriesPath = path.join(mainDir, "/data/galleries.json");
const paintingsPath = path.join(mainDir, "/data/paintings-nested.json");

// ======================================
// =          Data Acquisition          =
// ======================================
const artistData = fs.readFileSync(artistPath, 'utf-8');
const galleriesData = fs.readFileSync(galleriesPath, 'utf-8');
const paintingsData = fs.readFileSync(paintingsPath, 'utf-8');

// ==================================
// =          Data Parsing          =
// ==================================
const artists = JSON.parse(artistData);
const galleries = JSON.parse(galleriesData);
const paintings = JSON.parse(paintingsData);

// =============================
// =          Exports          =
// =============================
module.exports = {
    artists,
    galleries,
    paintings,
};
