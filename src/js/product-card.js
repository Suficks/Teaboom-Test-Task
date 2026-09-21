import { calcDiscountPercent, formatPrice } from './format-price.js';

/**
 * Карточка товара: синхронизирует цену, старую цену, скидку и артикул
 * с выбранной фасовкой. Данные фасовок берутся из data-атрибутов радио-кнопок,
 * поэтому разметка остаётся источником истины, а JS — тонким слоем.
 */
export class ProductCard {
  /**
   * @param {HTMLElement} root — элемент с атрибутом data-product
   */
  constructor(root) {
    this.form = root.querySelector('[data-product-form]');
    this.outputs = {
      sku: root.querySelector('[data-sku]:not(input)'),
      price: root.querySelector('[data-price]:not(input)'),
      oldPrice: root.querySelector('[data-old-price]:not(input)'),
      discount: root.querySelector('[data-discount]'),
    };

    this.form.addEventListener('change', this.handleChange);
    this.form.addEventListener('submit', this.handleSubmit);

    const checked = this.form.querySelector('input[name="packing"]:checked');
    if (checked) this.render(checked);
  }

  handleChange = (event) => {
    const input = event.target;
    if (input.name === 'packing' && input.checked) this.render(input);
  };

  /** Реальная корзина не подключена — только предотвращаем перезагрузку страницы. */
  handleSubmit = (event) => {
    event.preventDefault();
  };

  /**
   * @param {HTMLInputElement} input — выбранная радио-кнопка фасовки
   */
  render(input) {
    const price = Number(input.dataset.price);
    const oldPrice = Number(input.dataset.oldPrice);
    const discount = calcDiscountPercent(price, oldPrice);

    this.outputs.sku.textContent = input.dataset.sku;
    this.outputs.price.textContent = formatPrice(price);
    this.outputs.oldPrice.textContent = formatPrice(oldPrice);
    this.outputs.oldPrice.hidden = discount === 0;
    this.outputs.discount.textContent = `−${discount}%`;
    this.outputs.discount.hidden = discount === 0;
  }
}
