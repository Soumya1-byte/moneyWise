export const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes
    .filter((c) => typeof c === 'string')
    .join(' ')
    .trim();
};

export const formatCurrency = (amount: number, currency: string = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const getColorByPercentage = (percentage: number): string => {
  if (percentage <= 30) return 'text-money-green';
  if (percentage <= 60) return 'text-accent-yellow';
  if (percentage <= 80) return 'text-orange-500';
  return 'text-red-500';
};

export const getBackgroundByPercentage = (percentage: number): string => {
  if (percentage <= 30) return 'bg-money-green/10';
  if (percentage <= 60) return 'bg-accent-yellow/10';
  if (percentage <= 80) return 'bg-orange-100/50';
  return 'bg-red-100/50';
};
