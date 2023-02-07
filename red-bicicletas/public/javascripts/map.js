var map = L.map('main_map').setView([-34.6012424, -58.3861497], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attibution: '&copy; <a href="https://www.openstreetmap.org/copyright">Open</a> contributors'
}).addTo(map);

L.marker([-34.596932,-58.3808287]).addTo(map);
L.marker([-34.596924,-58.3808297]).addTo(map);
L.marker([-34.596964,-58.3808267]).addTo(map);