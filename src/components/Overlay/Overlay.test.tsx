import { shallow } from "enzyme";
import * as React from "react";

import { EnhancedOverlay, Overlay } from "./index";

const shallowUntil = component =>
  shallow(component)
    // @ts-ignore
    .until(Overlay)
    .dive();

describe("Overlay", () => {
  it("should display the children", () => {
    const wrapper = shallowUntil(<EnhancedOverlay>My content</EnhancedOverlay>);

    expect(wrapper.contains("My content")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a className of 'overlay'", () => {
    const wrapper = shallowUntil(<EnhancedOverlay>My content</EnhancedOverlay>);

    expect(wrapper.hasClass("overlay")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should react to mouse events", () => {
    const onClick = jest.fn();
    const wrapper = shallowUntil(<EnhancedOverlay onClick={onClick} />);

    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith();

    expect(wrapper).toMatchSnapshot();
  });
});
