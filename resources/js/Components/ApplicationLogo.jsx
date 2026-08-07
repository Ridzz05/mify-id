export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <div className={`flex items-center gap-2 ${className}`} {...props}>
            <span className="flex h-8 w-8 items-center justify-center border border-brand-dark bg-brand-lime text-[10px] font-black text-brand-dark font-mono select-none">
                S/
            </span>
            <span className="font-bold text-xl tracking-[-0.04em] text-brand-dark dark:text-white">
                Systemify
            </span>
        </div>
    );
}
