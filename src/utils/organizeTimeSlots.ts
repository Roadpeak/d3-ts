export const organizeTimeSlotsByDate = (timeSlots: any[]) => {
  return timeSlots.reduce((acc: { [key: string]: any[] }, slot) => {
    const date = slot.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});
};
