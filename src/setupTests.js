/*
As of Enzyme 3, Enzyme requires an Adapter corresponding to the version of React used.
(This project uses examples the adapter for React 16.)

The adapter is configured configured here.
*/
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
