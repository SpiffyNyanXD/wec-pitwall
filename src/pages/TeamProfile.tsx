import SportingFlag from '@/components/SportingFlag';
import { useParams, Link } from 'react-router-dom';
import VerifiedLayout, { Stat } from '@/components/VerifiedLayout';
import { getTeamById, getDriverById } from '@/data/wecData';
import NotFound from './NotFound';
export default function TeamProfile() {
 const { id = '' } = useParams(); const team = getTeamById(id);
 if (!team) return <NotFound/>;
 const year = Number(team.id.split('-')[1]);
 return <VerifiedLayout url={`/teams/${team.id}`} title={`${team.name} ${team.carNumber}`}><Link className="text-primary" to="/teams">← All teams</Link><p>{year} • {team.class} • {team.manufacturer}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3"><Stat label="Entry points" value={team.points}/><Stat label="Class wins" value={team.wecWins}/><Stat label="Class poles" value={team.poles}/><Stat label="Class fastest laps" value={team.fastestLaps}/></div><section className="glass-card p-6 space-y-3"><h2 className="text-xl font-bold">Season entry</h2><p>{team.about}</p><p>Car: {team.chassis}</p><p className="text-muted-foreground">Team headquarters, engine specifications and historical career totals are not inferred from the car manufacturer.</p></section><section className="glass-card p-6"><h2 className="text-xl font-bold mb-4">Season driver roster</h2><div className="grid sm:grid-cols-2 gap-3">{team.drivers.map(id => { const d = getDriverById(id); return d ? <Link className="p-3 border border-border rounded-md hover:text-primary" to={`/drivers/${d.id}`} key={id}><SportingFlag flag={d.countryFlag}/> {d.name}</Link> : null; })}</div></section></VerifiedLayout>;
}
