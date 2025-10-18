'use client'

import { useMemo, memo } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
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

const PopulationChart = memo(function PopulationChart({ 
  data,
  color = '#5B903A',
  showGrid = true,
  height = 180
}: PopulationChartProps) {
  // Stabilkan chart config dengan memoization ketat
  const chartConfig = useMemo(() => ({
    value: {
      label: 'Penduduk',
      color: color,
    },
  } satisfies ChartConfig), [color])

  // Stabilkan dataKey - hindari recalculation
  const dataKey = useMemo(() => 
    data[0]?.month ? 'month' : 'year',
    [data]
  )
  
  // Gradient ID unik per chart instance untuk mencegah collision
  const gradientId = useMemo(() => 
    `fillPop-${dataKey}-${Date.now()}`.replace(/[^a-zA-Z0-9-]/g, ''),
    [dataKey]
  )

  // Memoize processed data untuk stabilitas
  const chartData = useMemo(() => [...data], [data])

  return (
    <ChartContainer config={chartConfig} className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: -20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={color}
                stopOpacity={0.5}
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
              opacity={0.4}
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
            type="monotone"
            fill={`url(#${gradientId})`}
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            animationDuration={600}
            animationEasing="ease-in-out"
            isAnimationActive={true}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
})

export default PopulationChart
