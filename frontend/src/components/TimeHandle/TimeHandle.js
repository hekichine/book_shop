const handleTime = (day, hour, minute, second) => {
  if (day - 1 > 0) {
    return { result: day, define: "days ago" };
  }
  if (hour - 8 > 0) {
    return { result: hour, define: "hours ago" };
  }
  if (minute > 0) {
    return { result: minute, define: "minutes ago" };
  }
  if (second > 0) {
    return { result: "", define: "Just now" };
  }
};
export default handleTime;
