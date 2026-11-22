export type RaceBadgeStatus = 'done' | 'live' | 'next' | 'upcoming' | 'postponed' | 'cancelled' | 'awaiting';
interface RaceForStatus { id:string; scheduled_date:string; start_time_utc?:string; duration_hours:number; status:string; }
export function computeAllRaceStatuses(races:RaceForStatus[]):Map<string,RaceBadgeStatus>{
 const now=Date.now(),map=new Map<string,RaceBadgeStatus>();
 const next=races.filter(r=>!['completed','cancelled','postponed'].includes(r.status)&&Date.parse(r.scheduled_date+'T'+(r.start_time_utc??'23:59:59')+'Z')>now).sort((a,b)=>a.scheduled_date.localeCompare(b.scheduled_date))[0];
 for(const r of races){let state:RaceBadgeStatus='upcoming';if(r.status==='completed')state='done';else if(r.status==='cancelled')state='cancelled';else if(r.status==='postponed')state='postponed';else if(r.start_time_utc){const start=Date.parse(r.scheduled_date+'T'+r.start_time_utc+'Z');if(now>=start&&now<=start+r.duration_hours*3600000)state='live';else if(now>start+r.duration_hours*3600000)state='awaiting';else if(r.id===next?.id)state='next';}else if(Date.parse(r.scheduled_date+'T23:59:59Z')<now)state='awaiting';else if(r.id===next?.id)state='next';map.set(r.id,state);}return map;
}
