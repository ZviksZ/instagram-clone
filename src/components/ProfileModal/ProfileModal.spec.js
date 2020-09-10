import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ProfileModal } from './ProfileModal'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([thunk])

// eslint-disable-next-line
const setUp = () => shallow(<ProfileModal />)

describe('ProfileModal component', () => {

	it('should render ProfileModal', () => {
		const store = mockStore({
			posts: {
				profileModalItem: {
					post: {
						imgCaption: 'str',
						imgLink: 'str',
						userId: 'str',
						userPhoto: 'str',
						userName: 'str',
					},
					itemId: 'str',
				},
			},
			auth: {
				currentUser: {
					name: 'str',
					email: 'str',
					photoUrl: 'str',
					uid: 'str',
				},
			},
		})

		// eslint-disable-next-line
		const component = mount(
			<BrowserRouter>
				<Provider store={store}>
					<ProfileModal />
				</Provider>
			</BrowserRouter>
		)

		expect(component.find('.photoWrapper').length).toEqual(1)

		//expect(component).toMatchSnapshot()
	})
	/*it("should render Loader wrapper", () => {
		const component = setUp();

		const wrapper = component.find('.center-text');
		expect(wrapper.length).toBe(1);
	});*/
})
