import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowUpRight, ArrowClockwise, DeviceMobile, DeviceTablet, Monitor } from '@phosphor-icons/react';

export default function LivePreviewIndex({ siteUrl, totalPortfolios = 0, totalBriefs = 0, totalPipelines = 0 }) {
    const [device, setDevice] = useState('desktop');
    const [frameKey, setFrameKey] = useState(0);
    const deviceClass = device === 'mobile' ? 'w-[375px] h-[667px]' : device === 'tablet' ? 'w-[768px] h-[900px]' : 'w-full h-[760px]';

    return (
        <AdminLayout activeTab="live_preview" title="Live site">
            <Head title="Live site | Systemify" />
            <div className="space-y-8">
                <div className="flex flex-col gap-4 border-b border-white/15 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="mono-meta text-brand-lime">Public surface / viewport review</p><p className="mt-3 max-w-xl text-sm leading-6 text-white/55">Check the public experience at the same widths your visitors use before publishing a change.</p></div><div className="flex gap-2"><a href={siteUrl} target="_blank" rel="noreferrer" className="button-secondary text-white"><ArrowUpRight size={15} /> Open site</a><button type="button" onClick={() => setFrameKey((value) => value + 1)} className="button-primary"><ArrowClockwise size={15} /> Reload</button></div></div>
                <div className="grid gap-4 border-b border-white/15 pb-6 sm:grid-cols-3"><div><p className="font-mono text-[0.62rem] uppercase text-white/35">Selected systems</p><p className="mt-2 font-mono text-2xl text-white">{totalPortfolios}</p></div><div><p className="font-mono text-[0.62rem] uppercase text-white/35">Client intake</p><p className="mt-2 font-mono text-2xl text-white">{totalBriefs}</p></div><div><p className="font-mono text-[0.62rem] uppercase text-white/35">Tracked projects</p><p className="mt-2 font-mono text-2xl text-white">{totalPipelines}</p></div></div>
                <div className="flex flex-col gap-5"><div className="flex flex-wrap items-center gap-2"><span className="mr-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">Viewport</span>{[['desktop', Monitor, 'Desktop'], ['tablet', DeviceTablet, 'Tablet'], ['mobile', DeviceMobile, 'Mobile']].map(([value, Icon, label]) => <button type="button" key={value} onClick={() => setDevice(value)} className={`inline-flex items-center gap-2 border px-3 py-2 text-xs ${device === value ? 'border-brand-lime text-brand-lime' : 'border-white/15 text-white/55 hover:text-white'}`}><Icon size={15} />{label}</button>)}</div><div className="overflow-x-auto border border-white/15 bg-white/[0.02] p-3 sm:p-6"><div className={`mx-auto overflow-hidden border border-white/25 bg-brand-paper transition-[width,height] duration-200 ${deviceClass}`}><div className="flex items-center justify-between border-b border-brand-dark/15 bg-white px-3 py-2"><span className="font-mono text-[0.6rem] text-brand-dark/45">{siteUrl}</span><span className="flex items-center gap-1 font-mono text-[0.6rem] uppercase text-brand-dark/45"><span className="status-dot status-dot--operational" /> live</span></div><iframe key={frameKey} src={siteUrl} title="Systemify public site preview" className="h-[calc(100%-2rem)] w-full border-0 bg-brand-paper" loading="lazy" /></div></div></div>
            </div>
        </AdminLayout>
    );
}
