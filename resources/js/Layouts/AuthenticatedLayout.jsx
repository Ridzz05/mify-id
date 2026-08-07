import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { List, SignOut, X } from '@phosphor-icons/react';

function Mark() {
    return <span className="inline-flex items-center gap-2 text-white"><span className="flex h-8 w-8 items-center justify-center border border-white/30 bg-brand-lime text-[10px] font-black text-brand-dark font-mono tracking-[-0.12em]">S/</span><span className="text-xl font-bold tracking-[-0.05em]">Systemify</span></span>;
}

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-lime selection:text-brand-dark">
            <header className="border-b border-white/15">
                <div className="mx-auto flex min-h-[4.75rem] max-w-6xl items-center justify-between gap-5 px-5 sm:px-8">
                    <Link href={route('dashboard')} aria-label="Systemify workspace"><Mark /></Link>
                    <nav className="hidden items-center gap-6 md:flex" aria-label="Account navigation">
                        <Link href={route('dashboard')} className="text-sm text-white/65 hover:text-white">Workspace</Link>
                        <Link href={route('profile.edit')} className="text-sm text-white/65 hover:text-white">Profile</Link>
                        <Link href={route('logout')} method="post" as="button" className="inline-flex items-center gap-2 border-l border-white/20 pl-6 text-sm text-white/65 hover:text-red-300"><SignOut size={16} /> Log out</Link>
                    </nav>
                    <button type="button" className="border border-white/20 p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={18} /> : <List size={18} />}</button>
                </div>
                {open && <nav className="border-t border-white/15 px-5 py-4 md:hidden" aria-label="Mobile account navigation"><div className="mx-auto flex max-w-6xl flex-col gap-3 sm:px-3"><Link href={route('dashboard')} onClick={() => setOpen(false)} className="py-2 text-sm text-white/70">Workspace</Link><Link href={route('profile.edit')} onClick={() => setOpen(false)} className="py-2 text-sm text-white/70">Profile</Link><Link href={route('logout')} method="post" as="button" className="inline-flex items-center gap-2 py-2 text-left text-sm text-red-300"><SignOut size={16} /> Log out</Link></div></nav>}
            </header>
            {header && <div className="border-b border-white/15"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">{header}</div></div>}
            <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
            <p className="mx-auto max-w-6xl px-5 pb-6 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/30 sm:px-8">Signed in as {auth?.user?.email || 'system operator'}</p>
        </div>
    );
}
