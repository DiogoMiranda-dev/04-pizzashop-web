import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const OrderFilterSchema = z.object({
  orderID: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterFormData = z.infer<typeof OrderFilterSchema>

export function OrderTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<OrderFilterFormData>({
    resolver: zodResolver(OrderFilterSchema),
    values: {
      orderID: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter({
    orderID,
    customerName,
    status,
  }: OrderFilterFormData) {
    setSearchParams((state) => {
      if (orderID) {
        state.set('orderId', orderID)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleLimparFiltros() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')
      return state
    })
    reset({
      orderID: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderID')}
      />
      <Input
        placeholder="Nome do Cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button
        type="submit"
        variant="secondary"
        size="xs"
        disabled={isSubmitting}
      >
        <Search className="h-4 w-4 mr-2" />
        Filtrar Resultados
      </Button>

      <Button
        onClick={handleLimparFiltros}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="h-4 w-4 mr-2" />
        Remover Filtros
      </Button>
    </form>
  )
}
