import { http, HttpResponse } from 'msw'

import { updateProfileBody } from '../update-profile'

export const UpdateProfileMock = http.put<never, updateProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Pizza john') {
      return new HttpResponse(null, {
        status: 204,
      })
    }

    return new HttpResponse(null, {
      status: 400,
    })
  },
)
