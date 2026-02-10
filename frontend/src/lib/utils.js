
export function formatDate(date){
    return (date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }));
}

export const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export const toDateTimeLocal = (date) => {
  const pad = (n) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


