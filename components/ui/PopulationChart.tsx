'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface PopulationDataPoint {
  month?: string
  year?: string
  value: number
  date: string
}

interface PopulationChartProps {
  data: PopulationDataPoint[]
  color?: string
  showGrid?: boolean
  height?: number
}

export default function PopulationChart({ 
  data,
  color = '#5B903A',
  showGrid = true,
  height = 180
}: PopulationChartProps) {
  const chartConfig = {
    value: {
      label: 'Penduduk',
      color: color,
    },
  } satisfies ChartConfig

  const dataKey = data[0]?.month ? 'month' : 'year'

  return (
    <ChartContainer config={chartConfig} className="w-full" style={{ height: `${height}px` }}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: -20,
          bottom: 5,
        }}
      >
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
        {showGrid && (
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#e5e7eb" 
            opacity={0.5}
          />
        )}
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          interval="preserveStartEnd"
        />
        <YAxis hide />
        <ChartTooltip
          cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => value}
              formatter={(value) => [
                `${Number(value).toLocaleString('id-ID')} jiwa`, 
                'Penduduk'
              ]}
            />
          }
        />
        <Area
          dataKey="value"
          type="natural"
          fill="url(#fillPopulation)"
          stroke={color}
          strokeWidth={2.5}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}
