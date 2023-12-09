import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Wrappers from '../../Contexts/Wrappers/Wrappers';
import Home from './Home';

const mockFn = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockFn,
    createSearchParams: () => ''
}));

const RenderWithProviders = (Component) => {
    return (
        <BrowserRouter>
            <Wrappers >
                <Component />
            </Wrappers>
        </BrowserRouter>
    );
};


test('renders Home component and search by keyword navigate', () => {
    render(RenderWithProviders(Home));

    fireEvent.change(screen.getByTestId('searchKeyword'), { target: { value: 'React' } });
    fireEvent.click(screen.getByTestId('searchCTA'))

    expect(mockFn).toBeCalledTimes(1);
});
