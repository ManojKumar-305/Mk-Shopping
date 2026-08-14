import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { CartProvider } from '../../context/CartContext';
import { Product } from './Product';

vi.mock('axios', () => {
  const mockApi = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    create: vi.fn(() => mockApi),
  };

  return { default: mockApi };
});

describe('Product component', () => {
  let product;
  let user;

  beforeEach(() => {
    product = {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ['socks', 'sports', 'apparel'],
    };

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/cart-items?expand=product') {
        return { data: [] };
      }

      return { data: [] };
    });

    user = userEvent.setup();
  });

  it('displays the product details correctly', () => {
    render(
      <CartProvider>
        <Product product={product} />
      </CartProvider>
    );

    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      screen.getByText('$10.90')).toBeInTheDocument();

    expect(
      screen.getByTestId('product-image'))
      .toHaveAttribute('src', 'https://mk-shopping-backend.onrender.com/images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(
      screen.getByText('87')).toBeInTheDocument();

    expect(
      screen.getByTestId('product-image')
    ).toHaveAttribute('src', 'https://mk-shopping-backend.onrender.com/images/products/athletic-cotton-socks-6-pairs.jpg');
  });

  it('adds a product to the cart', async () => {
    render(
      <CartProvider>
        <Product product={product} />
      </CartProvider>
    );

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
    });
  });

  it('selects a quantity', async () => {
    render(
      <CartProvider>
        <Product product={product} />
      </CartProvider>
    );

    const quantitySelector = screen.getByTestId('product-quantity-selector');
    expect(quantitySelector).toHaveValue('1');

    await user.selectOptions(quantitySelector, '3');
    expect(quantitySelector).toHaveValue('3');

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 3,
    });
  });
});

