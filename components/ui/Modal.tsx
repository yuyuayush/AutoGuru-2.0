"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        setShow(isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-[var(--modal-bg)] rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 border border-[var(--modal-border)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-[var(--modal-border)]">
                    <h3 className="text-lg font-semibold text-[var(--modal-text-title)]">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-[var(--modal-close-icon)] hover:text-white transition-colors p-1 rounded-full hover:bg-[var(--modal-close-hover-bg)]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
