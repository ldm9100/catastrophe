import {Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {toast} from "sonner";
import {mutate} from "swr";

interface DeleteDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reportID?: string;
}

export const DeleteDrawer = ({ open, onOpenChange, reportID }: DeleteDrawerProps) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const handleDelete = async () => {
        if (!password) {
            toast.warning("비밀번호를 입력해주세요.");
            return;
        }

        if (!reportID) {
            return
        }

        setLoading(true);
        const res = await fetch(`/api/reports/${reportID}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password,
            }),
        });

        if (res.ok) {
            toast.success("제보가 삭제되었습니다.");
            await mutate("/api/reports");
            onOpenChange(false);
            setPassword("");
        } else {
            toast.error("제보 삭제 실패");
        }

        setLoading(false);
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>제보 삭제하기</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <DrawerFooter>
                    <Button onClick={handleDelete} disabled={loading}>
                        {loading ? "삭제 중..." : "제보 삭제"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
