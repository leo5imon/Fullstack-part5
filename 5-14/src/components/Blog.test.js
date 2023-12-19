/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('clicking the button calls event handler once', async () => {
  const blog = {
    likes: 1,
    url: 'https://google.com'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})