// GeolocateRow.jsx
// Import styles
import "../assets/css/App.css";

// GeolocateRow.jsx
function GeolocateRow({ latitude, longitude, timestamp }) {

    // Referencing
    // https://stackoverflow.com/questions/1801732/how-do-i-link-to-google-maps-with-a-particular-longitude-and-latitude
    const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`

    return (
        <>
            <div className="geolocate-cell-first">
                <p>Lat: {latitude}</p>
                <p>Long: {longitude}</p>
            </div>
            <p className="geolocate-cell">{timestamp}</p>
            <a href={mapLink} className="geolocate-cell-last" target="_blank">Open Google Maps</a>
            <div className="seperator"></div>
        </>
    );
}

export default GeolocateRow;