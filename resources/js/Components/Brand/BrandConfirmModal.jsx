import { Warning, X } from '@phosphor-icons/react';
import BrandButton from './BrandButton';

export default function BrandConfirmModal({
    isOpen,
    title = 'Confirm action',
    message = 'Are you sure you want to proceed?',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'danger',
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/85 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <div className="w-full max-w-md border border-white/20 bg-brand-dark p-6 text-white">
                <div className="flex items-center justify-between border-b border-white/15 pb-4"><p className={`inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] ${variant === 'danger' ? 'text-red-300' : 'text-brand-lime'}`}><Warning size={15} weight="bold" /> Confirm action</p><button type="button" onClick={onCancel} className="text-white/45 hover:text-white" aria-label="Close confirmation"><X size={17} /></button></div>
                <h2 id="confirm-title" className="mt-6 text-xl font-semibold tracking-[-0.03em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">{message}</p>
                <div className="mt-7 flex justify-end gap-3"><BrandButton variant="secondary" onClick={onCancel}>{cancelLabel}</BrandButton><BrandButton variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</BrandButton></div>
            </div>
        </div>
    );
}
