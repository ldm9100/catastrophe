'use client'

import {BusFront, Map} from "lucide-react";
import {useRouter} from "next/navigation";

export const BottomNavigationBar = () => {
    const router = useRouter()

    return <div className={"w-full max-w-md"} style={{
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        background: '#578FCA',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }}>
        <Map color={'white'} onClick={() => router.push('/')}/>
        <BusFront color={'white'} onClick={() => router.push('/shuttle')}/>
    </div>
}
