import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import until from "enzyme-shallow-until";
import ShallowWrapper from "enzyme/ShallowWrapper";

configure({ adapter: new Adapter() });
ShallowWrapper.prototype.until = until;
