export function timestampToDate(timestamp: number | bigint): string {
    // Если передан BigInt, явно преобразуем его в number
    const ts = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
    const date = new Date(ts * 1000); // Преобразуем секунды в миллисекунды
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }