import './scss/main.scss';
import { ProductCard } from './js/product-card.js';

document.querySelectorAll('[data-product]').forEach((root) => new ProductCard(root));
