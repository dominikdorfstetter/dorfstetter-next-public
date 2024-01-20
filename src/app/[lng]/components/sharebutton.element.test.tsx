import React from 'react';
import ReactDOM from 'react-dom/client';
import {render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareButton from './sharebutton.element';
import {act} from 'react-dom/test-utils';
import {jest} from "@jest/globals";

(global as any).navigator.share = jest.fn(async () => {});
jest.mock('@app/i18n', () => ({
    useTranslation: jest.fn(() => {
        return {
            t: (key: string) => key,
            i18n: {
                changeLanguage: jest.fn(),
            },
        };
    }),
}));

describe('ShareButton', () => {
    const lng = 'en';
    const url = 'http://localhost';
    const title = 'Test Title';
    let container = {} as any;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('renders without crashing', async () => {
        act(() => {
            ReactDOM.createRoot(container).render(<ShareButton lng={lng} url={url} title={title}/>)
        })

        await waitFor(() => {
            const button = container.querySelector('.share_button');

            expect(button).not.toBeNull();
        });
    });

    it('does not render if navigator.share is not available', async () => {
        // save navigator.share to temp
        const shareTmp = (global as any).navigator.share;
        (global as any).navigator.share = undefined;

        act(() => {
            ReactDOM.createRoot(container).render(<ShareButton lng={lng} url={url} title={title}/>)
        });

        // reset the navigator for following tests
        (global as any).navigator.share = shareTmp;

        await waitFor(() => {
            const button = container.querySelector('.share_button');

            expect(button).toBeNull();
        });
    });

    it('calls share function when clicked', async () => {
        await act(async () => {
            ReactDOM.createRoot(container).render(<ShareButton lng={lng} url={url} title={title}/>);

        });

        await waitFor(async () => {
            const button = container.querySelector('.share_button');

            if (button) await act(() => fireEvent.click(button));
            expect(global.navigator.share).toHaveBeenCalledTimes(1);
            expect(global.navigator.share).toHaveBeenCalledWith({"title": "Test Title", "url": "http://localhost"});
        });

    });
});