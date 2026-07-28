import { CircleX } from "lucide-react";

type CloseButtonProps = {
  onClose: () => void;
};

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button type="submit" onClick={onClose}>
      <CircleX />
    </button>
  );
}
