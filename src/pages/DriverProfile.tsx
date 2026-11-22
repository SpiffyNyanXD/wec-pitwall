import SportingFlag from '@/components/SportingFlag';
import { useParams, Link } from 'react-router-dom';
import VerifiedLayout, { Stat } from '@/components/VerifiedLayout';
import { getDriverById, comparison } from '@/data/wecData';
import NotFound from './NotFound';
export default function DriverProfile() {
 const { id = '' } = useParams(); const d = getDriverById(id); if (!d) return <NotFound/>;
 const year = d.id.slice(-4), metrics = comparison.find(r => r.driver_slug === d.id.slice(0,-5) && r.season === year);
 return <VerifiedLayout url={`/drivers/${d.id}`} title={d.name}><Link className="text-primary" to="/drivers">← All drivers</Link><p className="text-lg"><SportingFlag flag={d.countryFlag}/> {d.nationality} • {year} • {d.class}</p><Link className="text-primary" to={`/teams/${d.teamId}`}>{d.team} {d.carNumber}</Link><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[['Points',d.points],['Wins',d.wins],['Podiums',d.podiums],['Poles',d.poles],['Fastest laps',d.fastestLaps],['Starts',metrics?.starts ?? 0],['Le Mans class wins',d.leMansWins],['Season titles',d.championships]].map(([label,value]) => <Stat key={label} label={String(label)} value={value}/>)}</div><section className="glass-card p-6"><h2 className="text-xl font-bold mb-3">Verified record</h2><p>{d.biography}</p><p className="mt-3 text-muted-foreground">A driver may have multiple classes or entries in one season. The team above is their latest classified entry. Comparison totals include all verified entries in the selected year. This page does not present unverified date of birth, career totals or biography as fact.</p><Link className="text-primary block mt-4" to="/compare">Compare complete 2024–2026 statistics →</Link></section></VerifiedLayout>;
}
