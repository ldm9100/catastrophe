'use client';

import {useEffect, useRef} from "react";
import {Coordinate} from "@/types/Coordinate";
import {Report} from '../components/ReportCanvas'

const INITIAL_LAT = 37.45291124168444
const INITIAL_LON = 126.95165625784453
const MARKER_LAT = 37.45008245372354
const MARKER_LON = 126.95263000235825

interface MapProps {
    reports: Array<Report>
    setClickedCoordinates: (coord: Coordinate) => void
    setCurrentReport: (report?: Report) => void
}

const Map = ({ reports, setClickedCoordinates, setCurrentReport }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null!)
    const mapInstance = useRef<naver.maps.Map | null>(null)

    // initialize map
    useEffect(() => {
        if (typeof window !== 'undefined' && window.naver && mapRef.current && !mapInstance.current) {
            const mapOptions = {
                center: new naver.maps.LatLng(INITIAL_LAT, INITIAL_LON),
                zoom: 15,
            };

            mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions)
        }
    }, []);

    // set initial markers
    useEffect(() => {
        if (reports.length < 1) return
        reports.map(({ lat, lng }) => addMarker({ longitude: lng, latitude: lat }))
    }, [reports]);

    // click map coordinates
    useEffect(() => {
        if (mapInstance.current === null) return
        naver.maps.Event.addListener(mapInstance.current!, 'click', (e) => {
            setClickedCoordinates({ latitude: e.coord.lat(), longitude: e.coord.lng() })
        })
    }, []);

    const addMarker = ({ longitude, latitude }: Coordinate) => {
        if (mapInstance.current === null) return

        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: mapInstance.current!,
        })

        // get report on marker click
        naver.maps.Event.addListener(marker, 'click', () => {
            const report = reports.find((report) => report.lat === latitude && report.lng === longitude)
            setCurrentReport(report)
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
