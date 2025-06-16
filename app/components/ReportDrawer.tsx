import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import {Coordinate} from "@/types/Coordinate";
import {PlusIcon} from "lucide-react";

interface ReportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPos?: Coordinate;
}

export default function ReportDrawer({
  open,
  onOpenChange,
  selectedPos,
}: ReportDrawerProps) {
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedPos || !content || !password) {
      toast.warning("모든 항목을 입력해주세요.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        password,
        lat: selectedPos.latitude,
        lng: selectedPos.longitude,
      }),
    });

    if (res.ok) {
      toast.success("제보가 등록되었습니다.");
      mutate("/api/reports");
      onOpenChange(false);
      setContent("");
      setPassword("");
    } else {
      toast.error("제보 등록 실패");
    }

    setLoading(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>제보하기</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Textarea
            placeholder="제보 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={() => alert('기능 개발중')} disabled={loading}>
            {'사진 추가'}
            <PlusIcon size={16} strokeWidth={3}/>
          </Button>
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "등록 중..." : "제보 등록"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
