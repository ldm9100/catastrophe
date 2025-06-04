"use client";

import { useState } from "react";
import ReportButton from "./ReportButton";
import ReportDialog from "./ReportDialog";

type Report = {
  id: string;
  x: number;
  y: number;
  content: string;
};

export default function ReportCanvas() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedPos, setSelectedPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSelectedPos({ x, y });
  };

  const handleSubmit = (content: string) => {
    if (!selectedPos) return;
    setReports((prev) => [
      ...prev,
      { id: crypto.randomUUID(), x: selectedPos.x, y: selectedPos.y, content },
    ]);
    setSelectedPos(null);
    setShowDialog(false);
  };

  return (
    <div className="relative w-full h-full bg-zinc-100" onClick={handleClick}>
      {/* 제보 버튼들 */}
      {reports.map((r) => (
        <ReportButton key={r.id} x={r.x} y={r.y} content={r.content} />
      ))}

      {/* + 말풍선 */}
      {selectedPos && (
        <button
          className="absolute w-6 h-6 bg-blue-500 text-white rounded-full text-sm"
          style={{
            left: `${selectedPos.x * 100}%`,
            top: `${selectedPos.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => {
            e.stopPropagation(); // 외부 클릭 이벤트 막기
            setShowDialog(true);
          }}
        >
          +
        </button>
      )}

      {/* 제보 입력 모달 */}
      {showDialog && selectedPos && (
        <ReportDialog
          onClose={() => setShowDialog(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
