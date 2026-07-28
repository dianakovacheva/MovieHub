import CloseButton from "./close-button";

type AlertType =
  | "alert-success"
  | "alert-error"
  | "alert-warning"
  | "alert-info";

type AlertProps = {
  type: AlertType;
  message: string;
  onClose: () => void;
};

export default function Alert({ type, message, onClose }: AlertProps) {
  return (
    type &&
    message &&
    onClose && (
      <div
        role="alert"
        className={`alert ${type} absolute flex items-center justify-center top-20 left-auto right-20 index-999 w-[30%]`}
      >
        <span>{message}</span>
        <CloseButton onClose={onClose} />
      </div>
    )
  );
}
