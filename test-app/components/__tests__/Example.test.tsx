import {render, screen, fireEvent} from '@testing-library/react-native'
import { Example } from '../Example'

test('examples of some things', async () => {

// Arrange 
  const expectedUsername = 'Ada Lovelace'

  //Act
  await render(<Example />)

  await fireEvent.changeText(screen.getByTestId('input'), expectedUsername)
  await fireEvent.press(screen.getByText('Print Username'))

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId('printed-username')

  // Assert
  // Using the built-in `toHaveTextContent` matcher from React Native Testing Library.
  expect(usernameOutput).toHaveTextContent(expectedUsername)

  expect(screen.toJSON()).toMatchSnapshot()
})

