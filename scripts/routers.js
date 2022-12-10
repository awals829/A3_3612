// ===================================
// =          Error Message          =
// ===================================
/** JSON message object for server response.
 * 
 * @param {*} msg String to display to client.
 * @returns None
 */
const jsonMessage = (msg) => {
    return { message : msg };
};

// ===========================================
// =          Checks If Data Exists          =
// ===========================================
/** Determines if the data is valid data or if no data was found.
 * 
 * @param {*} data JSON data to be searched.
 * @param {*} jsonMessage A JSON message object.
 * @param {*} res The response object to the client from the server.
 * @returns Data on success or a jsonMessage on failure.
 */
function resultsCheck (data, jsonMessage){ 
    if (data.length > 0) {
        return data;
    } else {
        return jsonMessage(`No Data Found By That Search`);
    }
}

// ==================================
// =          Requirements          =
// ==================================
const path = require('path');

// ====================================
// =          Main Directory          =
// ====================================
const mainDir = path.join(__dirname, '/..');

// ===========================
// =          Paths          =
// ===========================
const rootFile = path.join(mainDir, '/html/index.html');

// ==============================
// =          Main URL          =
// ==============================
const root = (app) =>{
    app.get('/', (req, res) => {
        res.sendFile(rootFile);
    });
}

// ===================================
// =          Paintings URL          =
// ===================================
const paintingsAll = (data, app) => {
    app.get('/api/paintings', (req, res) => {
        res.json(resultsCheck(data, jsonMessage));
    });
}

// =============================================
// =          Paintings Search ID URL          =
// =============================================
const paintingsIDSearch = (data, app) => {
    app.get('/api/painting/:id', (req, res) => {
        const search = data.filter(p => p.paintingID == req.params.id);
        console.log(typeof search);
        res.json(resultsCheck(search, jsonMessage));
    });
}

// =============================================
// =          Galleries Search ID URL          =
// =============================================
const galleriesID = (data, app) => {
    app.get('/api/painting/gallery/:id', (req, res) => {
        const search = data.filter(p => req.params.id == p.gallery.galleryID);
        res.json(resultsCheck(search, jsonMessage));
    });
}

// ===========================================
// =          Artists Search ID URL          =
// ===========================================
const artistsID = (data, app) => {
    app.get('/api/painting/artist/:id', (req, res) => {
        const search = data.filter(p => req.params.id == p.artist.artistID);
        res.json(resultsCheck(search, jsonMessage));
    });
}

// ===========================================
// =          Paintings Year Search          =
// ===========================================
const paintingsYearSearch = (data, app) => {
    app.get('/api/painting/year/:min/:max', (req, res) => {
        const search = data.filter(p => (p.yearOfWork >= req.params.min && p.yearOfWork <= req.params.max));
        res.json(resultsCheck(search, jsonMessage));
    });
}

// ============================================
// =          Paintings Title Search          =
// ============================================
const paintingsTitleSearch = (data, app) => {
    app.get('/api/painting/title/:text', (req, res) => {
        const search = data.filter(p => p.title.toLowerCase().includes(req.params.text.toLowerCase()));
        res.json(resultsCheck(search, jsonMessage));
    });
}

// =============================================
// =          Paintings Colour Search          =
// =============================================
const paintingsColourSearch = (data, app) => {
    app.get('/api/painting/color/:name', (req, res) => {
        console.log( req.params.name)
        const search = checkColours(data, req.params.name.toLowerCase());
        res.json(resultsCheck(search, jsonMessage));
    });
}

/** Grabs all data corresponding to the text name of a colour.
 * 
 * @param {*} data JSON data to be searched.
 * @param {*} colour Text name of the colour being searched for.
 * @returns An array of JSON objects with any colour matching the colour name parameter.
 */
function checkColours(data, colour) {
    let match = [];
    data.forEach( p => {
        p.details.annotation.dominantColors.forEach( c => {
            if (c.name.toLowerCase() == colour)
                match.push(p);
        })
    })
    return match;
}

// =================================
// =          Artists URL          =
// =================================
const artistsAll = (data, app) => {
    app.get('/api/artists', (req, res) => {
        res.json(resultsCheck(data, jsonMessage));
    });
}

// ================================================
// =          Artists Search Country URL          =
// ================================================
const artistCountry = (data, app) => {
    app.get('/api/artists/:country', (req, res) => {
        const search = data.filter(a => a.Nationality.toLowerCase() == req.params.country.toLowerCase());
        res.json(resultsCheck(search, jsonMessage));
    });
}

// ===================================
// =          Galleries URL          =
// ===================================
const galleriesAll = (data, app) => {
    app.get('/api/galleries', (req, res) => {
        res.json(resultsCheck(data, jsonMessage));
    });
}

// ==================================================
// =          Galleries Search Country URL          =
// ==================================================
const galleriesCountry = (data, app) => {
    app.get('/api/galleries/:country', (req, res) => {
        const search = data.filter(g => g.GalleryCountry.toLowerCase() == req.params.country.toLowerCase());
        res.json(resultsCheck(search, jsonMessage));
    });
}

// =============================
// =          Exports          =
// =============================
module.exports = {
    root,
    paintingsAll,
    paintingsIDSearch,
    paintingsTitleSearch,
    paintingsYearSearch,
    paintingsColourSearch,
    artistsAll,
    artistCountry,
    artistsID,
    galleriesAll,
    galleriesCountry,
    galleriesID,
};