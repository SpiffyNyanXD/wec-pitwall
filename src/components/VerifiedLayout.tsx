import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { ReactNode } from 'react';
export default function VerifiedLayout({ title, children, url }: { title: string; children: ReactNode; url?:string }) {
 return <div className="min-h-screen bg-background"><SEOHead url={url} title={title} description="Source-linked FIA WEC results, 2024–2026."/><Header/><main id="main-content" tabIndex={-1} className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6"><h1 className="text-3xl sm:text-4xl font-bold font-racing">{title}</h1><p className="text-sm text-muted-foreground">Verified archive • 2024–2026 • Updated 22 November 2026. Zero means zero, not missing data. Statistics are bounded to the selected season, not lifetime career totals.</p>{children}</main></div>;
}
export function Stat({ label, value }: {label: string; value: ReactNode}) { return <div className="glass-card p-4"><div className="text-2xl font-bold text-primary">{value}</div><div className="text-sm text-muted-foreground">{label}</div></div>; }
export const selectStyle = 'bg-background border border-border rounded-md p-2 max-w-full';
export const cellStyle = 'p-3 text-left whitespace-normal';
