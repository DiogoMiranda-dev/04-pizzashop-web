import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const GetProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      name: 'John Doe',
      id: '123',
      email: 'johndoe@example.com',
      phone: '123456789',
      role: 'manager',
      createdAt: new Date('2022-01-01T00:00:00.000Z'),
      updatedAt: new Date('2022-01-01T00:00:00.000Z'),
    })
  },
)
