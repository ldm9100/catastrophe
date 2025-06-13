"use client";

import {useState} from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReportDrawer from "./ReportDrawer";
import Map from "./Map"
import {Coordinate} from "@/types/Coordinate";
import {Header} from "@/app/components/Header";

export type Report = {
  id: number;
  content: string;
  lat: number;
  lng: number;
};

export type LatLng = { lat: number; lng: number };
type XYRatio = { x: number; y: number };

// 중심 좌표 (서울) 및 줌 수준 시뮬레이션, 지도 연동 전 임시 조치
const center: LatLng = { lat: 37.5665, lng: 126.978 };
const zoom = 12;

// 화면 비율 → 위경도 변환
export function toLatLng(xRatio: number, yRatio: number): LatLng {
  const lat = center.lat - (yRatio - 0.5) * (1 / zoom);
  const lng = center.lng + (xRatio - 0.5) * (1 / zoom);
  return { lat, lng };
}

// 위경도 → 화면 비율 변환
function toXYRatio(lat: number, lng: number): XYRatio {
  const x = 0.5 + (lng - center.lng) * zoom;
  const y = 0.5 - (lat - center.lat) * zoom;
  return { x, y };
}

export default function ReportCanvas() {
  const [selectedPos, setSelectedPos] = useState<LatLng | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedMapCoordinates, setSelectedMapCoordinates] = useState<Coordinate>()
  const [currentReport, setCurrentReport] = useState<Report>()
  const [showCurrentReport, setShowCurrentReport] = useState(false)

  // 1. 초기 제보 목록 불러오기
  const {
    data: reports,
    error,
    isLoading,
  } = useSWR<Report[]>("/api/reports", fetcher);

  // 2. 화면 클릭 → 위경도 추출
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showDrawer) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const pos = toLatLng(xRatio, yRatio);
    if (selectedPos) {
      setSelectedPos(null);
    } else {
      setSelectedPos(pos);
    }

    setShowCurrentReport(false)
  };

  if (error) toast.error("네트워크 에러");

  return (
    <div className="relative w-full h-full bg-zinc-100" onClick={handleClick}>
      <Header title={'지도'}/>

      <Map
          reports={reports ?? []}
          setClickedCoordinates={setSelectedMapCoordinates}
          setCurrentReport={setCurrentReport}
          setShowCurrentReport={setShowCurrentReport}
          showCurrentReport={showCurrentReport}
          setSelectedPos={setSelectedPos}
      />

      {/* + 버튼 */}
      {selectedPos &&
        (() => {
          const { x, y } = toXYRatio(selectedPos.lat, selectedPos.lng);
          return (
            <TooltipProvider>
              <Tooltip open>
                <TooltipTrigger asChild>
                  <div
                    className="absolute w-3 h-3 bg-blue-500 rounded-full z-40"
                    style={{
                      left: `${x * 100}%`,
                      top: `${y * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDrawer(true);
                  }}
                >
                  <div className="flex items-center gap-1">
                    {showCurrentReport && currentReport ?
                        <p className="text-base font-medium select-none">
                          {currentReport?.content}
                        </p>
                        :
                        <>
                          <p className="text-base font-medium select-none">
                            제보하기
                          </p>
                          <PlusIcon size={16} strokeWidth={3}/>
                        </>
                    }
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })()}

      <ReportDrawer
        open={showDrawer}
        onOpenChange={setShowDrawer}
        selectedPos={selectedMapCoordinates}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-black opacity-25 z-50 flex items-center justify-center">
          <Loader2Icon className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
    </div>
  );
}
