'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface PopulationDataPoint {
  month: string
  value: number
  date: string
}

interface PopulationChartProps {
  data: PopulationDataPoint[]
  color?: string
}

export default function PopulationChart({ 
  data,
  color = '#5B903A'
}: PopulationChartProps) {
  const chartConfig = {
    population: {
      label: 'Penduduk',
      color: color,
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[120px] w-full">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillPopulation" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={color}
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor={color}
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 10, fill: '#666' }}
          interval="preserveStartEnd"
        />
        <ChartTooltip
          cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '5 5' }}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => `Bulan: ${value}`}
              formatter={(value) => [`${Number(value).toLocaleString('id-ID')} jiwa`, 'Penduduk']}
            />
          }
        />
        <Area
          dataKey="value"
          type="monotone"
          fill="url(#fillPopulation)"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}
