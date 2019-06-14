import React, { useState, useRef } from 'react';

import Map from './Map';
import MarkerDetails from './MarkerDetails';
import NewMarker from './NewMarker';

const markerInitialData = () => {
	// Load localstorage items to initial state
	const markLocations = localStorage.markLocations;
	if (markLocations) return JSON.parse(markLocations);
	return [];
};

export default function App() {
	const [markLocations, setMarkLocation] = useState(markerInitialData);
	const latRef = useRef();
	const lonRef = useRef();

	const addMarkers = links => map => {
		// Place marker on google maps
		links.forEach((link, index) => {
			const contentString = `
				<div id="content">
				<div id="siteNotice">
				</div>
				<h1 id="firstHeading" class="firstHeading">${link.title}</h1>
				<div id="bodyContent">
				<p><img src=${link.img} width="300px" /></p>
				<p>${link.desc}</p>
				</div>
				</div>`;

			const infowindow = new window.google.maps.InfoWindow({
				content: contentString
			});

			const marker = new window.google.maps.Marker({
				map,
				position: link.coords,
				label: `${index + 1}`,
				title: link.title
			});

			marker.addListener(`click`, () => {
				infowindow.open(map, marker);
			});

			window.google.maps.event.addListener(map, 'click', function(e) {
				const latLng = e.latLng;
				const latValue = latLng.lat();
				const lonValue = latLng.lng();

				latRef.current.value = latValue;
				lonRef.current.value = lonValue;
			});
		});
	};

	const mapProps = {
		options: {
			center: { lat: 10.8390254, lng: 76.346312 },
			zoom: 14
		},
		onMount: addMarkers(markLocations)
	};

	return (
		<div className="flex">
			<div className="sidebar">
				<NewMarker
					markLocations={markLocations}
					setMarkLocation={setMarkLocation}
					latRef={latRef}
					lonRef={lonRef}
				/>
				<div>
					<MarkerDetails markLocations={markLocations} setmarkLocations={setMarkLocation} />
				</div>
			</div>
			<div className="grow">
				<Map {...mapProps} />
			</div>
		</div>
	);
}
