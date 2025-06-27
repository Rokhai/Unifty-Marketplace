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

type DeleteItemAlertProps = {
    deleteId: string | null;
    setDeletedId: (id: string | null) => void;
    handleDelete: (id: string) => void;
    alertMessage?: string;
}

export default function DeleteItemAlert({deleteId, setDeletedId, handleDelete, alertMessage}: DeleteItemAlertProps) {
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
                    <AlertDialogCancel>No, Keep It!</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        if (deleteId !== null) handleDelete(deleteId);
                        setDeletedId(null);

                    }}>
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}