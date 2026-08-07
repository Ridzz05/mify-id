export default function BrandCard({
    children,
    variant = 'default', // 'default', 'accent'
    className = '',
    onClick,
    ...props
}) {
    const isClickable = typeof onClick === 'function';

    const cardStyles = variant === 'accent'
        ? "brand-surface border-brand-blue/40 flex flex-col justify-between"
        : "brand-surface flex flex-col justify-between";

    return (
        <div
            onClick={onClick}
            className={`${cardStyles} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
            {...props}
        >
            <div className="flex h-full w-full flex-1 flex-col">
                {children}
            </div>
        </div>
    );
}
