var map = L.map('main_map').setView([-27.450888, -58.986478], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attibution: '&copy; <a href="https://www.openstreetmap.org/copyright">Open</a> contributors'
}).addTo(map);

// L.marker([-27.450888, -58.986478]).addTo(map);
// L.marker([-27.433185780483903, -58.967382870152946]).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map)
        });
    }
})

