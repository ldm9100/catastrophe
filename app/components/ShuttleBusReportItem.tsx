'use client'

import {BusFront} from "lucide-react";
import {Spacer} from "@/components/ui/spacer";
import {useState} from "react";
import {Coordinate} from "@/types/Coordinate";
import ReportDrawer from "@/app/components/ReportDrawer";

interface ShuttleBusReportItemProps {
    name: string
    coordinates: Coordinate
}

export const ShuttleBusReportItem = ({ name, coordinates }: ShuttleBusReportItemProps) => {
    const [showDrawer, setShowDrawer] = useState(false)

    return <div className={'w-full'}>
        <div className={'w-full'} style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '16px 20px',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <BusFront/>
                <Spacer width={16}/>
                <p className={'text-lg'}>{name}</p>
            </div>


            <div style={{
                backgroundColor: 'pink',
                padding: '8px 16px',
                borderRadius: 8,
            }}
                 onClick={() => setShowDrawer(true)}
            >
                <p className={'text-white text-lg'}>제보하기</p>
            </div>
        </div>

        <Spacer height={1} backgroundColor={'lightgray'}/>

        <ReportDrawer
            open={showDrawer}
            onOpenChange={setShowDrawer}
            selectedPos={coordinates}
        />
    </div>

}
