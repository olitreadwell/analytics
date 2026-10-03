import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from './tooltip'

describe('Tooltip', () => {
  test('shows the tooltip while the trigger is hovered', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip info="More details">
        <button>Trigger</button>
      </Tooltip>
    )

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.hover(screen.getByRole('button', { name: 'Trigger' }))

    expect(screen.getByRole('tooltip')).toHaveTextContent('More details')
  })

  test('shows the tooltip while the trigger is focused with the keyboard', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip info="More details">
        <button>Trigger</button>
      </Tooltip>
    )

    await user.tab()

    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus()
    expect(screen.getByRole('tooltip')).toHaveTextContent('More details')
  })

  test('hides the tooltip when the trigger loses focus', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Tooltip info="More details">
          <button>Trigger</button>
        </Tooltip>
        <button>Next</button>
      </>
    )

    await user.tab()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.tab()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
