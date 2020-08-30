import { useSelector } from 'react-redux';
import React                         from "react";
import {GlobalMessage}               from "./GlobalMessage";

jest.mock("react-redux", () => ({
   useDispatch: jest.fn(),
   useSelector: jest.fn(),
}));


const setUp = () => shallow(<GlobalMessage />);

describe("GlobalMessage component", () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });

   it("should render GlobalMessage", () => {
      useSelector.mockImplementation((selector) => selector({
         app: {
            message: {
               type: 'error',
               text: 'Ошибка. Попробуйте снова'
            }
         }
      }));

      const component = shallow(<GlobalMessage />);
      expect(component).toMatchSnapshot();
   });
});
