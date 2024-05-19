
export function getRouteLength(coords: [number, number][]): number {
    function deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        var R = 6371; // Rayon de la Terre en km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance en km
        return d;
    }

    var length = 0;
    for (var i = 1; i < coords.length; i++) {
        var lat1 = coords[i - 1][0];
        var lon1 = coords[i - 1][1];
        var lat2 = coords[i][0];
        var lon2 = coords[i][1];
        var d = distance(lat1, lon1, lat2, lon2);
        length += d;
    }
    return length;
}
