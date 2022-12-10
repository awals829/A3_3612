// ==================================
// =          Requirements          =
// ==================================
const express = require('express');

// ========================================
// =          Initialize Express          =
// ========================================
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const port = 8080;

// ==========================
// =          APIs          =
// ==========================
const data = require('./scripts/data-provider.js');
const routers = require('./scripts/routers.js');

// =====================================
// =          Server Listener          =
// =====================================
app.listen(port, () => {
    console.log(`Site listening port: localhost: ` + port);
});

// =============================
// =          Routers          =
// =============================
routers.root(app);
routers.paintingsAll(data.paintings, app);
routers.paintingsIDSearch(data.paintings, app);
routers.paintingsTitleSearch(data.paintings, app);
routers.paintingsYearSearch(data.paintings, app);
routers.paintingsColourSearch(data.paintings, app);
routers.artistsAll(data.artists, app);
routers.artistCountry(data.artists,app);
routers.artistsID(data.paintings, app);
routers.galleriesAll(data.galleries, app);
routers.galleriesCountry(data.galleries, app);
routers.galleriesID(data.paintings, app);
