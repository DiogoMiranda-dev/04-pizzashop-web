import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  {
    product: '4 queijos',
    amount: 15,
  },
  {
    product: 'Calabresa',
    amount: 13,
  },
  {
    product: 'Portuguesa',
    amount: 20,
  },
  {
    product: 'Marguerita',
    amount: 33,
  },
  {
    product: 'Pepperoni',
    amount: 43,
  },
  {
    product: 'Mussarela',
    amount: 30,
  },
  {
    product: 'Frango com catupiry',
    amount: 42,
  },
]

const PieColors = [
  colors.sky[500],
  colors.emerald[500],
  colors.amber[500],
  colors.violet[500],
  colors.lime[500],
  colors.pink[500],
  colors.indigo[500],
]

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex-row items-center justify-between pb-8 space-y-0">
        <CardTitle className="text-base font-medium">
          Produtos populares
        </CardTitle>
        <BarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={76}
              innerRadius={54}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].product.length > 12
                      ? data[index].product.substring(0, 12).concat('...')
                      : data[index].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PieColors[index % PieColors.length]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
