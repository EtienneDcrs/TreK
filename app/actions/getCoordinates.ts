import xml2js from 'xml2js';

// Function to extract the coordinates from a GPX file
export function getCoordinatesFromGPX(file: File): Promise<{ lat: number[], lng: number[], ele: number[] }> {
    return new Promise((resolve, reject) => { // Create a promise
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result as string;

            const latlngList: { lat: number[], lng: number[], ele: number[] } = { lat : [], lng : [], ele : [] };

            // Parse the GPX file and extract the coordinates
            const parser = new xml2js.Parser();

            parser.parseString(data, (err: any, result: any) => {
                // If there is an error, reject the promise
                if (err) {
                    reject(err);
                    return;
                }

                // Assuming the coordinates are stored in a specific format within the GPX file
                const coordinates = result.gpx.trk[0].trkseg[0].trkpt;

                coordinates.forEach((coord: any) => {
                    latlngList.lat.push(parseFloat(coord.$.lat));
                    latlngList.lng.push(parseFloat(coord.$.lon));
                    latlngList.ele.push(parseFloat(coord.ele[0]));
                });

                resolve(latlngList); // Resolve the promise with the extracted coordinates
            });
        };
        reader.onerror = (event) => { // If there is an error reading the file, reject the promise
            reject(new Error(`File could not be read: ${event.target?.error}`));
        };
        reader.readAsText(file);
    });
}

// Function to extract the coordinates from a KML file
export function getCoordinatesFromKML(file: File): Promise<{ lat: number[], lng: number[], ele: number[] }> {
    return new Promise((resolve, reject) => { // Create a promise
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result as string;

            const latlngList: { lat: number[], lng: number[], ele: number[] } = { lat : [], lng : [], ele : [] };

            // Parse the KML file and extract the coordinates
            const parser = new xml2js.Parser();

            parser.parseString(data, (err: any, result: any) => {
                if (err) { // If there is an error, reject the promise
                    reject(err);
                    return;
                }

                // Assuming the coordinates are stored in a specific format within the KML file
                const coordinates = result.kml.Document[0].Placemark[0].LineString[0].coordinates[0].replace(/(\n)/gm, "n").replace(/(\s)/gm, "").split("n");
                if(coordinates[0] === ''){
                    coordinates.shift(); // Remove the first empty element
                }
                if (coordinates[coordinates.length - 1] === '') {
                    coordinates.pop(); // Remove the last empty element
                }
                 // Remove the first empty element
                coordinates.forEach((coord: string) => {
                    const [lng, lat, ele] = coord.split(',');
                    latlngList.lat.push(parseFloat(lat));
                    latlngList.lng.push(parseFloat(lng));
                    latlngList.ele.push(parseFloat(ele));
                });

                resolve(latlngList); // Resolve the promise with the extracted coordinates
            });
        };
        reader.onerror = (event) => {
            reject(new Error(`File could not be read: ${event.target?.error}`));
        };
        reader.readAsText(file);
    });
}