import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { healthUrl } from '~/constants'
import Box from '@mui/material/Box'
import Loader from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface HealthData {
  status: string
  timestamp: string
  uptime?: number
}

export const Route = createFileRoute('/health')({
  component: RouteComponent,
})

export function RouteComponent() {
  const { isLoading, error, data } = useQuery<HealthData>({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await fetch(healthUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    },
    staleTime: 30 * 1000,
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h2" gutterBottom>
        Health Status
      </Typography>
      {error && <Alert severity="error">{(error as Error).message}</Alert>}
      {data && (
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6">Status:</Typography>
              <Chip
                label={data.status}
                color={data.status === 'ok' ? 'success' : 'error'}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Timestamp: {new Date(data.timestamp).toLocaleString()}
            </Typography>
            {data.uptime !== undefined && (
              <Typography variant="body2" color="text.secondary">
                Uptime: {Math.floor(data.uptime)}s
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
