export const isStanding = (originalSeatStr: string) => {
  const seatStr = originalSeatStr.toUpperCase();
  if (seatStr.includes(`GENERAL ADMISSION`) || seatStr.includes(`GA`))
    return true;
  return false;
};
