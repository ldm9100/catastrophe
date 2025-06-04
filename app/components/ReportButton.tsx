import { useState } from "react";

export default function ReportButton({
  x,
  y,
  content,
}: {
  x: number;
  y: number;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="absolute w-5 h-5 bg-red-500 rounded-full"
        style={{
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      />
      {open && (
        <div
          className="absolute bg-white border text-sm p-2 rounded z-40 max-w-[200px]"
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            transform: "translate(-50%, -120%)",
          }}
        >
          {content}
          <button
            className="text-xs text-blue-500 block mt-1"
            onClick={() => setOpen(false)}
          >
            닫기
          </button>
        </div>
      )}
    </>
  );
}
