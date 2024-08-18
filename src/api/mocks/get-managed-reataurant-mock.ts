import { http, HttpResponse } from 'msw'

import { getManagedRestaurantResponse } from '../get-managed-reataurant'

export const GetManagedRestaurantMock = http.get<
  never,
  never,
  getManagedRestaurantResponse
>('/me', () => {
  return HttpResponse.json({
    name: 'Pizza John',
    id: '123',
    createdAt: new Date('2022-01-01T00:00:00.000Z'),
    updatedAt: new Date('2022-01-01T00:00:00.000Z'),
    description: 'Lorem ipsum',
    managerId: '123',
  })
})
