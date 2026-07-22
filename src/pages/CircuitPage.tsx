import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { circuits } from '../data/circuitData'

export function CircuitPage() {
  const { slug } = useParams<{ slug: string }>()
  const circuit = circuits.find(c => c.slug === slug)

  if (!circuit) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold">Circuit not found</h1>
        <Link to="/circuits" className="text-red-500 mt-4 inline-block">
          ← Back to Circuits
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{circuit.name} — WEC Pitwall</title>
        <meta
          name="description"
          content={`WEC circuit stats and race history for ${circuit.name} in ${circuit.country}.`}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{circuit.name}</h1>
            <p className="text-zinc-400">{circuit.city}, {circuit.country}</p>
          </div>
          <Link to="/circuits" className="text-sm text-zinc-400 hover:text-white">
            ← All Circuits
          </Link>
        </div>

        {/* Track Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard label="Track Length" value={`${circuit.lengthKm} km`} numeric />
          <StatCard label="Turns" value={String(circuit.turns)} numeric />
          {circuit.established && (
            <StatCard label="Established" value={String(circuit.established)} numeric />
          )}
        </div>

        {/* Lap Record */}
        {circuit.lapRecordTime && (
          <section className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
            <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-3">
              WEC Lap Record
            </h2>
            <p className="font-orbitron text-2xl text-white">{circuit.lapRecordTime}</p>
            {circuit.lapRecordHolder && (
              <p className="text-zinc-400 text-sm mt-1">
                {circuit.lapRecordHolder}
                {circuit.lapRecordYear ? ` — ${circuit.lapRecordYear}` : ''}
              </p>
            )}
          </section>
        )}

        {/* Description */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-2">
            About This Circuit
          </h2>
          <p className="text-zinc-300 leading-relaxed">{circuit.description}</p>
        </section>

        {/* WEC History */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-2">
            WEC History
          </h2>
          <p className="text-zinc-300 leading-relaxed">{circuit.wecHistory}</p>
        </section>
      </div>
    </>
  )
}

function StatCard({
  label, value, numeric
}: { label: string; value: string; numeric?: boolean }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={numeric ? 'font-orbitron text-xl text-white' : 'text-white text-lg'}>
        {value}
      </p>
    </div>
  )
}
