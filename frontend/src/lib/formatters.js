const CURRENCY_FORMATTER = new Intl.NumberFormat("en-GB", {
  currency: "GBP",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(currency) {
  return CURRENCY_FORMATTER.format(Number(currency||"0"));
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-GB");

export function formatNumber(currency) {
 return NUMBER_FORMATTER.format(Number(currency||"0"));
}

