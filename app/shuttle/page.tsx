import {Header} from "@/app/components/Header";
import {ShuttleBusReportItem} from "@/app/components/ShuttleBusReportItem";

export default function Shuttle() {
    return <div className={"w-full max-w-md"}>
        <Header title={'셔틀버스'}/>

        <div className={'w-full max-w-md'} style={{
            top: 60,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
        }}>
            <ShuttleBusReportItem
                name={'행정관 -> 입구역'}
                coordinates={{ latitude: 37.461118994210885, longitude: 126.95051501239051 }}
            />
            <ShuttleBusReportItem
                name={'입구역 -> 행정관'}
                coordinates={{ latitude: 37.47999591743536, longitude: 126.95234543595011 }}
            />
            <ShuttleBusReportItem
                name={'교내 순환셔틀'}
                coordinates={{ latitude: 37.465668190164145, longitude: 126.94838125018924 }}
            />
        </div>
    </div>;
}
