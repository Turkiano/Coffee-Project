import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserTypes } from "@/types";

interface AlertProps {
  user: UserTypes;
  onConfirm: () => void;
}

export function AlertUser({ user, onConfirm }: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
        Delete
      </AlertDialogTrigger>{" "}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this category {user.firstName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            user and remove your data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
