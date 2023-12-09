import { render, screen } from '@testing-library/react';
import Wrappers from '../../Contexts/Wrappers/Wrappers';
import BaseLayout from './BaseLayout';


const RenderWithProviders = (Component) => {
    return (
        <Wrappers >
            <Component />
        </Wrappers>
    );
};


test('renders base layout', () => {
    render(RenderWithProviders(BaseLayout));
    const element = screen.getByTestId('layout')

    expect(element).toBeInTheDocument();
});
