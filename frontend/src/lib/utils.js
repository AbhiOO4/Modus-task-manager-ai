
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

