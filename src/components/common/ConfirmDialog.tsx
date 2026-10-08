import { useEffect, useRef } from "react";
import "./ConfirmDialog.css";
import { PrimaryAction } from "./PrimaryAction";

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ isOpen, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      cancelBtnRef.current?.focus();
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="nha-dialog"
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
    >
      <div className="nha-dialog-content">
        <h2 id="dialog-title" className="nha-dialog-title">Bạn có chắc chắn?</h2>
        <p id="dialog-desc" className="nha-dialog-text">
          Toàn bộ tiến trình sẽ bị xóa. Bạn sẽ phải xây lại ngôi nhà từ đầu.
        </p>
        <div className="nha-dialog-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="nha-dialog-cancel"
            onClick={onCancel}
            autoFocus
          >
            Giữ tiến trình
          </button>
          <PrimaryAction label="Xóa tiến trình và chơi lại" onClick={onConfirm} />
        </div>
      </div>
    </dialog>
  );
}
