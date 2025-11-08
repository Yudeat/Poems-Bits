'use client';

import { ReactNode, useEffect } from "react";
import clsx from "clsx";

export type ToastType = "success" | "error";

export interface ToastProps {
  id: string;
  message: ReactNode; // <-- supports JSX
  type?: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

export default function Toast({
  id,
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={clsx(
        "mb-3 px-6 py-3 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 animate-slide-up",
        type === "success" && "bg-green-600 text-white",
        type === "error" && "bg-red-600 text-white"
      )}
      onClick={() => onClose(id)}
    >
      {message}
    </div>
  );
}
