import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { CartProvider } from '../../context/CartContext';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
  let paymentSummary;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/cart-items?expand=product') {
        return { data: [] };
      }
      return { data: [] };
    });

    user = userEvent.setup();
  });

  it('displays the correct details', () => {
    render(
      <HelmetProvider>
        <CartProvider>
          <MemoryRouter>
            <PaymentSummary paymentSummary={paymentSummary} />
          </MemoryRouter>
        </CartProvider>
      </HelmetProvider>
    );

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-product-cost'))
        .getByText('$42.75')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$47.74');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$4.77');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$52.51');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <HelmetProvider>
        <CartProvider>
          <MemoryRouter>
            <PaymentSummary paymentSummary={paymentSummary} />
            <Location />
          </MemoryRouter>
        </CartProvider>
      </HelmetProvider>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
});