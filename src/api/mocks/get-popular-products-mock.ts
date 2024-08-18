import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const GetPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {
      amount: 5,
      product: 'Pizza Marguerita',
    },
    {
      amount: 3,
      product: 'Pizza Calabresa',
    },
    {
      amount: 2,
      product: 'Pizza Portuguesa',
    },
    {
      amount: 1,
      product: 'Pizza Frangos',
    },
    {
      amount: 1,
      product: 'Pizza Quatro Queijos',
    },
  ])
})
