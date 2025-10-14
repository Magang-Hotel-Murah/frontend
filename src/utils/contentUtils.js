// utils/contentUtils.js

/**
 * Ambil nilai dari nested object berdasarkan path (misal: "user.division.name")
 */
export const getNestedValue = (obj, path) => {
  if (!obj) return ""; // kalau obj undefined/null
  if(typeof obj !== "string") return "";

  const value = path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);

  return value != null ? String(value) : "";
};

/**
 * Filter array berdasarkan searchTerm dan keys (bisa nested path)
 * @param {Array} data - data array
 * @param {string} searchTerm - kata kunci pencarian
 * @param {Array<string>} keys - daftar key/nested path (contoh: ["user.name", "room.name"])
 */
export const filterBySearch = (data, searchTerm, keys) => {
  if (!Array.isArray(data)) return []; // pastikan data array
  if (!searchTerm) return data;

  const lowerTerm = searchTerm.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => {
      const value = getNestedValue(item, key);
      return value && value.toLowerCase().includes(lowerTerm);
    })
  );
};

/**
 * Pagination helper
 * @param {Array} data - data array
 * @param {number} currentPage - halaman saat ini
 * @param {number} itemsPerPage - jumlah item per halaman
 */
export const paginateData = (data, currentPage, itemsPerPage) => {
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { currentData, totalPages };
};
