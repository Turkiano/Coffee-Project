import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog";
import { InputOTPForm } from "./InputOTPForm";
import { Dispatch, SetStateAction } from "react";

export function OtpDailog({
  openOTP,
  setOpenOTP,
}: {
  openOTP: boolean;
  setOpenOTP: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={openOTP} onOpenChange={setOpenOTP}>
      <DialogContent className="sm:max-w-[425px]">
        <InputOTPForm />
      </DialogContent>
    </Dialog>
  );
}
