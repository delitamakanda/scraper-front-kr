import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { weatherUrl } from "~/constants";
import Box from '@mui/material/Box'
import Loader from '@mui/material/CircularProgress'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from "@mui/material/CardContent";
import Alert from '@mui/material/Alert'

interface WeaterData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  icon: string;
}

export const Route = createFileRoute('/weather')({
  component: RouteComponent,
})

function RouteComponent() {
  // todo fetch weather data from API weatherUrl
  const { isLoading, error, data } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await fetch(weatherUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },
    staleTime: 10 * 60 * 1000,
  })
  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Loader /></Box>
  return (
      <Box sx={{ width: '100%', p: 3}}>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Grid2 container spacing={3}>
          {data?.map((w: WeaterData, _: number) => (
              <Card key={w.city.toLowerCase()} sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flexGrow: 1}}>
                  <Typography variant="h6" component="h3" gutterBottom>{w.city}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb:2 }}>
                    <img src={`https://openweathermap.org/img/wn/${w.icon}.png`}
                         alt={w.description} width={50} height={50}/>
                    <Typography variant="h5" sx={{ ml: 1}}>{w.temperature}°C</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{w.description}</Typography>
                  <Typography variant="body2">
                    Humidity: {w.humidity}%
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Grid2>
      </Box>
  )
}
