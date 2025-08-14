// lib/money.ts
export const formatAUD = (n?: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n ?? 0);
  