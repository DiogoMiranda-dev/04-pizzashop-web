import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text when order status is pending', () => {
    /* PENDING */
    const wrapper = render(<OrderStatus status="pending" />)
    // wrapper.debug()
    const statusText = wrapper.getByText('Pendente')
    const bagdeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(bagdeElement).toHaveClass('bg-slate-500')
  })

  it('should display the right text when order status is canceled', () => {
    /* canceled */
    const wrapper = render(<OrderStatus status="canceled" />)
    const statusText = wrapper.getByText('Cancelado')
    const bagdeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(bagdeElement).toHaveClass('bg-rose-500')
  })

  it('should display the right text when order status is processing', () => {
    /* processing */
    const wrapper = render(<OrderStatus status="processing" />)
    const statusText = wrapper.getByText('Processando')
    const bagdeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(bagdeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text when order status is delivering', () => {
    /* delivering */
    const wrapper = render(<OrderStatus status="delivering" />)
    const statusText = wrapper.getByText('Entregando')
    const bagdeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(bagdeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text when order status is delivered', () => {
    /* delivered */
    const wrapper = render(<OrderStatus status="delivered" />)
    const statusText = wrapper.getByText('Entregue')
    const bagdeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(bagdeElement).toHaveClass('bg-emerald-500')
  })
})
