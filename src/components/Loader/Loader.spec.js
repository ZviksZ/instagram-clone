import React from "react";
import {Loader} from './Loader';

const setUp = () => shallow(<Loader />);

describe("Loader component", () => {
   it("should render Loader", () => {
      const component = setUp();
      expect(component).toMatchSnapshot();
   });
   it("should render Loader wrapper", () => {
      const component = setUp();

      const wrapper = component.find('.center-text');
      expect(wrapper.length).toBe(1);
   });
});
