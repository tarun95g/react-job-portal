import { render, screen } from '@testing-library/react';
import Wrappers from '../../Contexts/Wrappers/Wrappers';
import BannerWithSearch from './BannerWithSearch';


const RenderWithProviders = (Component) => {
    return (
        <Wrappers >
            <Component />
        </Wrappers>
    );
};


test('renders Banner and search', () => {
    render(RenderWithProviders(BannerWithSearch));
    const element = screen.getByTestId('searchFilters')

    expect(element).toBeInTheDocument();
});
