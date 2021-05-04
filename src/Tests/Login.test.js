import React from 'react';
import testRenderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Login from '../Components/Login';

configure({ adapter: new Adapter() });
const mockToken = jest.fn();

describe('Login component', function() {
    it('component renders correctly', () => {
        shallow(<Login setToken={mockToken} />);
        const tree = testRenderer.create(<Login setToken={ mockToken }/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})