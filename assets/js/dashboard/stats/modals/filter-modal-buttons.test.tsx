import React, { ReactNode } from 'react'
import { render, screen } from '../../../../test-utils'
import userEvent from '@testing-library/user-event'
import { TestContextProviders } from '../../../../test-utils/app-context-providers'
import FilterModalGroup from './filter-modal-group'
import FilterModalRow from './filter-modal-row'
import FilterModalPropsRow from './filter-modal-props-row'

const Providers = ({ children }: { children: ReactNode }) => (
  <TestContextProviders siteOptions={{ domain: 'dummy.site' }}>
    {children}
  </TestContextProviders>
)

test('the add-another control is a button that adds a row', async () => {
  const onAddRow = jest.fn()

  render(
    <FilterModalGroup
      filterGroup="goal"
      filterState={{ goal: ['is', 'goal', []] }}
      labels={{}}
      onUpdateRowValue={jest.fn()}
      onAddRow={onAddRow}
      onDeleteRow={jest.fn()}
    />,
    { wrapper: Providers }
  )

  const addButton = screen.getByRole('button', { name: '+ Add another' })
  expect(addButton).toHaveAttribute('type', 'button')

  await userEvent.click(addButton)
  expect(onAddRow).toHaveBeenCalledWith('goal')
})

test('the row delete control is a named button that removes the row', async () => {
  const onDelete = jest.fn()

  render(
    <FilterModalRow
      testId="goal0"
      filter={['is', 'goal', ['Signup']]}
      labels={{ Signup: 'Signup' }}
      canDelete
      showDelete
      onUpdate={jest.fn()}
      onDelete={onDelete}
    />,
    { wrapper: Providers }
  )

  const deleteButton = screen.getByRole('button', { name: 'Remove filter' })
  expect(deleteButton).toHaveAttribute('type', 'button')

  await userEvent.click(deleteButton)
  expect(onDelete).toHaveBeenCalled()
})

test('the props row delete control is a named button that removes the row', async () => {
  const onDelete = jest.fn()

  render(
    <FilterModalPropsRow
      testId="props0"
      filter={['is', 'event:props:plan', ['Pro']]}
      showDelete
      disabledOptions={[]}
      onUpdate={jest.fn()}
      onDelete={onDelete}
    />,
    { wrapper: Providers }
  )

  const deleteButton = screen.getByRole('button', { name: 'Remove filter' })
  expect(deleteButton).toHaveAttribute('type', 'button')

  await userEvent.click(deleteButton)
  expect(onDelete).toHaveBeenCalled()
})
