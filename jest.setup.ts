import '@testing-library/jest-dom';
import 'isomorphic-fetch';

// Workaround for react-helmet elements
jest.mock('react-helmet', () => {
    const React = require('react');
    const plugin = jest.requireActual('react-helmet');

    // @ts-ignore
    const mockHelmet = ({children, ...props}) => {
        return React.createElement('div', {
            ...props,
            className: 'mock-helmet',
        }, children);
    };
    return {
        ...plugin,
        Helmet: jest.fn().mockImplementation(mockHelmet),
    };
});