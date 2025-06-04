import { useState } from "react";

export default function ReportDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-80">
        <textarea
          className="w-full h-24 p-2 border"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end mt-2 space-x-2">
          <button onClick={onClose} className="text-red-500">
            취소
          </button>
          <button
            onClick={() => {
              if (text.trim()) onSubmit(text.trim());
            }}
            className="text-blue-500"
          >
            제보
          </button>
        </div>
      </div>
    </div>
  );
}
