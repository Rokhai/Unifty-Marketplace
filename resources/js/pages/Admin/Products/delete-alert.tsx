import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

type DeleteAlertProps = {
    deleteId: string | null;
    setDeletedId: (id: string | null) => void;
    handleDelete: (id: string) => void;
    alertMessage?: string;
}

export default function DeleteAlert({deleteId, setDeletedId, handleDelete, alertMessage}: DeleteAlertProps) {
    return (
        <AlertDialog open={deleteId !== null} onOpenChange={open => !open && setDeletedId(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently this {alertMessage || "item" }.
                        {/* This action cannot be undone. This will permanently delete this product. */}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        if (deleteId !== null) handleDelete(deleteId);
                        setDeletedId(null);

                    }}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}