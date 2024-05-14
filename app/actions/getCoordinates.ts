import xml2js from 'xml2js';

export function getCoordinatesFromGPX(file: File): Promise<{ lat: number, lng: number, ele: number}[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result as string;

            const latlngList: { lat: number, lng: number, ele: number }[] = [];

            // Parse the GPX file and extract the coordinates
            const parser = new xml2js.Parser();

            parser.parseString(data, (err: any, result: any) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Assuming the coordinates are stored in a specific format within the GPX file
                const coordinates = result.gpx.trk[0].trkseg[0].trkpt;

                coordinates.forEach((coord: any) => {
                    const lat = parseFloat(coord.$.lat);
                    const lng = parseFloat(coord.$.lon);
                    const ele = parseFloat(coord.ele[0]);
                    latlngList.push({ lat, lng, ele });
                });

                resolve(latlngList);
            });
        };
        reader.onerror = (event) => {
            reject(new Error(`File could not be read: ${event.target?.error}`));
        };
        reader.readAsText(file);
    });
}