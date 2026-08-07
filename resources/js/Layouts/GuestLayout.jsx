import { Link } from '@inertiajs/react';

function AuthMark() {
    return (
        <span className="inline-flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center border border-white/30 bg-brand-lime text-[10px] font-black text-brand-dark font-mono tracking-[-0.12em]">S/</span>
            <span className="text-xl font-bold tracking-[-0.05em]">Systemify</span>
        </span>
    );
}

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-lime selection:text-brand-dark">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
                <header className="flex items-center justify-between border-b border-white/15 pb-5">
                    <Link href="/" aria-label="Systemify home"><AuthMark /></Link>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/40">Secure workspace access</span>
                </header>
                <main className="flex flex-1 items-center justify-center py-14">
                    <div className="grid w-full max-w-4xl gap-10 lg:grid-cols-[1fr_25rem] lg:items-center">
                        <div className="hidden lg:block">
                            <p className="mono-meta text-brand-lime">SYSTEMIFY / OPERATE</p>
                            <h1 className="mt-5 max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.06em]">A calmer view of the work behind the work.</h1>
                            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">The workspace keeps projects, client intake, and system status in one place.</p>
                        </div>
                        <div className="border border-white/15 bg-white/[0.03] p-6 sm:p-8">
                            {children}
                        </div>
                    </div>
                </main>
                <footer className="border-t border-white/15 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">BUILD / AUTOMATE / OPERATE</footer>
            </div>
        </div>
    );
}
