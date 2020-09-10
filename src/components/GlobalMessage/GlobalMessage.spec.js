import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalMessage } from './GlobalMessage'

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}))

// eslint-disable-next-line
const setUp = () => shallow(<GlobalMessage />)

describe('GlobalMessage component', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	afterAll(() => {
		jest.restoreAllMocks()
	})

	it('should render GlobalMessage', () => {
		useSelector.mockImplementation((selector) =>
			selector({
				app: {
					message: {
						type: 'error',
						text: 'Ошибка. Попробуйте снова',
					},
				},
			})
		)

		const component = setUp()
		expect(component).toMatchSnapshot()
	})
})
