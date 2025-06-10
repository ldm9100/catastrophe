'use client';

import {useEffect, useRef} from "react";
import {Coordinate} from "@/types/Coordinate";

const INITIAL_LAT = 37.45291124168444
const INITIAL_LON = 126.95165625784453
const MARKER_LAT = 37.45008245372354
const MARKER_LON = 126.95263000235825

interface MapProps {
    reportCoordinates: Array<Coordinate>
    setClickedCoordinates: (coord: Coordinate) => void
}

const Map = ({ reportCoordinates, setClickedCoordinates }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null!)
    const mapInstance = useRef<naver.maps.Map | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.naver && mapRef.current && !mapInstance.current) {
            const mapOptions = {
                center: new naver.maps.LatLng(INITIAL_LAT, INITIAL_LON),
                zoom: 15,
            };

            mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions)
        }
    }, []);

    useEffect(() => {
        if (mapInstance.current === null) return
        naver.maps.Event.addListener(mapInstance.current!, 'click', (e) => {
            setClickedCoordinates({ latitude: e.coord.lat(), longitude: e.coord.lng() })
        })
    }, []);

    useEffect(() => {
        // TODO: re-rendering 매번 되는 거 막기
        if (reportCoordinates.length < 1) return
        reportCoordinates.map((coordinate) => addMarker(coordinate))
    }, [reportCoordinates]);

    const addMarker = ({ longitude, latitude }: Coordinate) => {
        if (mapInstance.current === null) return

        new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: mapInstance.current!,
        })
    }


    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <div ref={mapRef} style={{width: '100%', height: '100%'}}/>
            </div>
        </>
    );
};

export default Map;
