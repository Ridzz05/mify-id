import { ArrowDown, ArrowUp, Plus, Trash } from '@phosphor-icons/react';

export default function Repeater({ items = [], renderItem, onAdd, onRemove, onMove, emptyLabel = 'Nothing configured yet.', addLabel = 'Add item' }) {
    return (
        <div className="space-y-3">
            {items.length === 0 && <p className="border border-dashed border-white/15 px-3 py-4 text-xs leading-5 text-white/40">{emptyLabel}</p>}
            {items.map((item, index) => (
                <div key={item.id || index} className="border border-white/10 bg-white/[0.02] p-3">
                    {renderItem(item, index)}
                    <div className="mt-3 flex items-center justify-end gap-1 border-t border-white/10 pt-2">
                        <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0} className="border border-white/10 p-1.5 text-white/45 disabled:opacity-25" aria-label={`Move item ${index + 1} up`}><ArrowUp size={13} /></button>
                        <button type="button" onClick={() => onMove(index, 1)} disabled={index === items.length - 1} className="border border-white/10 p-1.5 text-white/45 disabled:opacity-25" aria-label={`Move item ${index + 1} down`}><ArrowDown size={13} /></button>
                        <button type="button" onClick={() => onRemove(index)} className="border border-red-300/30 p-1.5 text-red-300" aria-label={`Delete item ${index + 1}`}><Trash size={13} /></button>
                    </div>
                </div>
            ))}
            <button type="button" onClick={onAdd} className="flex w-full items-center justify-center gap-2 border border-dashed border-brand-lime/50 px-3 py-2 text-xs text-brand-lime hover:bg-brand-lime/10"><Plus size={14} />{addLabel}</button>
        </div>
    );
}
