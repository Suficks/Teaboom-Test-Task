const formatters = {
  integer: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
  fractional: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
};

/**
 * Форматирует цену в рублях: 1646 → «1 646 ₽», 349.2 → «349,20 ₽».
 * @param {number} value
 * @returns {string}
 */
export function formatPrice(value) {
  const formatter = Number.isInteger(value) ? formatters.integer : formatters.fractional;
  return formatter.format(value);
}

/**
 * Размер скидки в процентах, округлённый до целого.
 * @param {number} price
 * @param {number} oldPrice
 * @returns {number}
 */
export function calcDiscountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}
