'use client';

import {useEffect, useRef} from "react";

const INITIAL_LAT = 37.45291124168444
const INITIAL_LON = 126.95165625784453
const MARKER_LAT = 37.45008245372354
const MARKER_LON = 126.95263000235825

const Map = () => {
    const mapRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.naver && mapRef.current) {
            const mapOptions = {
                center: new naver.maps.LatLng(INITIAL_LAT, INITIAL_LON),
                zoom: 15,
            };

            const map = new naver.maps.Map(mapRef.current, mapOptions);

            // Example: add a marker
            new naver.maps.Marker({
                position: new naver.maps.LatLng(MARKER_LAT, MARKER_LON),
                map: map,
            });
        }
    }, []);


    return (
        <>
            <div style={{width: '100%', height: '500px'}}>
                <p>map</p>
                <div ref={mapRef} style={{width: '100%', height: '100%'}}/>
            </div>
        </>
    );
};

export default Map;
