//dayIndex :0~6 (0->Monday)
export const getUnixTimeByDay = dayIndex => {
  const now = new Date();
  const nowTime = now.setHours(0, 0, 0, 0);
  const day = now.getDay();
  const oneDayTime = 24 * 60 * 60 * 1000;
  const MondayTime = nowTime - (day - 1) * oneDayTime;
  return dayIndex * oneDayTime + MondayTime;
};

export const getTimeDifferenceFromZeroOfToday = time =>
  time - new Date().setHours(0, 0, 0, 0);
