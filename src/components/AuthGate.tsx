import { useAuth } from '../hooks/useAuth'
import { AuthModal } from './AuthModal'

interface Props {
  children: React.ReactNode
  featureName?: string
}

export function AuthGate({ children, featureName }: Props) {
  const { user, loading } = useAuth()
  if (loading) return <div className="animate-pulse h-48 bg-zinc-800 rounded-xl" />
  if (!user) return <AuthModal featureName={featureName} />
  return <>{children}</>
}
