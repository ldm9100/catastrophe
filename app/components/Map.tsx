'use client';

import React, {useEffect, useRef} from "react";
import {Coordinate} from "@/types/Coordinate";
import {LatLng, Report, toLatLng} from '../components/ReportCanvas'
import {DateTime} from "@/util/DateTime";

const INITIAL_LAT = 37.45291124168444
const INITIAL_LON = 126.95165625784453

interface MapProps {
    reports: Array<Report>
    setClickedCoordinates: (coord: Coordinate) => void
    setCurrentReport: (report?: Report) => void
    showCurrentReport: boolean
    setShowCurrentReport: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedPos: React.Dispatch<React.SetStateAction<LatLng | null>>
}

const Map = (props: MapProps) => {
    const { reports, setClickedCoordinates, setCurrentReport, setShowCurrentReport, setSelectedPos } = props
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
        reports.map(({ lat, lng, createdAt }) => addMarker({ longitude: lng, latitude: lat }, createdAt))
    }, [reports]);

    // click map coordinates
    useEffect(() => {
        if (mapInstance.current === null) return
        naver.maps.Event.addListener(mapInstance.current!, 'click', (e) => {
            setClickedCoordinates({ latitude: e.coord.lat(), longitude: e.coord.lng() })
        })
    }, []);

    const addMarker = (coord: Coordinate, createdAt: string ) => {
        if (mapInstance.current === null) return

        const { longitude, latitude } = coord
        const color = DateTime.getColorByTime(createdAt)

        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: mapInstance.current!,
            icon: {
                content: `<div style="
                    background-color: ${color};
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    border: 2px solid white;
                "></div>`
            },
        })

        // get report on marker click
        naver.maps.Event.addListener(marker, 'click', (e) => {
            e.domEvent.stopPropagation()

            const rect = mapRef.current.getBoundingClientRect();
            const xRatio = (e.domEvent.clientX - rect.left) / rect.width;
            const yRatio = (e.domEvent.clientY - rect.top) / rect.height;
            const pos = toLatLng(xRatio, yRatio);
            setSelectedPos(pos)

            const report = reports.find((report) => report.lat === latitude && report.lng === longitude)
            setCurrentReport(report)
            setShowCurrentReport(true)
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
