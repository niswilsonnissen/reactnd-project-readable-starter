import dateFormat from "dateformat";

export function capitalize(str = "") {
  return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
}

export function formatDate(timestamp) {
  if (timestamp) {
    const date = new Date(timestamp);
    return ` on ${dateFormat(date, "dd-mm-yyyy")} at ${dateFormat(
      date,
      "HH:MM"
    )}`;
  }
  return "";
}

export function indexedById(collection) {
  return collection.reduce(
    (obj, val) => ({ ...obj, [val.id]: { ...val } }),
    {}
  );
}
