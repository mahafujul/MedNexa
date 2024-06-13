export function filterOutPastSlots(slots, date) {
  const dateTime = new Date(date);
  //Store filtered slots
  let filteredSlots = [];
  // Split the time string to extract hours and minutes
  for (let i = 0; i < slots.length; i++) {
    const time = slots[i];
    const [hour, minutePeriod] = time.split(":");
    const [minute, periodType] = minutePeriod.split(" ");
    // Adjust the hour based on the period (AM/PM)
    dateTime.setHours(
      periodType === "PM" && hour !== "12"
        ? parseInt(hour) + 12
        : parseInt(hour),
      parseInt(minute)
    );

    // Only add future time slots
    if (dateTime > new Date()) {
      filteredSlots.push(time);
    }
  }
  return filteredSlots;
}
