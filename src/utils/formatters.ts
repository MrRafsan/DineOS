/**
 * Formatting utilities for ChillyPOS
 */

export const formatBDT = (amount: number, symbol: boolean = false): string => {
  if (symbol) {
    return `৳${Math.round(amount).toLocaleString('en-US')}`;
  }
  return `BDT ${Math.round(amount).toLocaleString('en-US')}`;
};

export const getElapsedTimeFormatted = (
  createdAt: string,
  initialSeconds: number = 0
): string => {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const totalSeconds = Math.max(
    0,
    Math.floor((now - createdTime) / 1000) + initialSeconds
  );

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
};

export const formatTimeOnly = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch {
    return dateStr;
  }
};

export const formatDateOnly = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
