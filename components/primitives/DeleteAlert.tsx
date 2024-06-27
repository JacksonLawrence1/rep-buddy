import Alert from "./Alert";

interface DeleteAlertProps {
  label: string;
  visible: boolean; 
  setVisible: (visible: boolean) => void;
  deleteFunction: () => void;
}

export default function DeleteAlert({ label, visible, setVisible, deleteFunction }: DeleteAlertProps) {
  return  (
    <Alert // alert for deleting workout
        visible={visible} 
        setVisible={setVisible}
        title={`Delete ${label}?`} 
        description={`Are you sure you want to delete this item? This action cannot be undone, and all associated data with it will be be lost.`} 
        onSubmit={deleteFunction}
        submitText={`Delete ${label}`}
        cancelText="Cancel"
      />
  );
}
