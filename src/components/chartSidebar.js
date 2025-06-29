// src/components/chartSidebar.js

// Exclude any key that includes these substrings (case-insensitive)
const EXCLUDE_KEYS = [
    'id', 'date', 'phone', 'client', 'org', 'created', 'updated', 'by', 'uid', 'model-name', 'identifier', 'propertylabel', 'status', 'doc', 'processed', 'year', 'c_', 'ad_', 'lg_', 'value', 'documentno', 'isactive', 'isapproved', 'skip-records', 'array-count', 'page-count', 'records-size', 'row-count'
];

function filterColumns(record) {
    return Object.entries(record)
        .filter(([key, value]) => {
            const lower = key.toLowerCase();
            // Exclude if key contains any of the EXCLUDE_KEYS substrings
            if (EXCLUDE_KEYS.some(ex => lower.includes(ex))) return false;
            if (typeof value === "object") return false;
            return true;
        })
        .map(([key, value]) => ({ value: key, label: key }));
}

/**
 * Fetches and filters parameter (column) options for a given API endpoint.
 * @param {object} params
 * @param {object} params.axiosInstance - Axios instance with auth.
 * @param {string} params.apiPostfix - The API endpoint postfix (e.g. '/models/lg_hsurvey').
 * @returns {Promise<{ options: Array<{value: string, label: string}>, labels: Record<string, string> }>}
 */
export async function fetchParameterOptions({ axiosInstance, apiPostfix }) {
    const res = await axiosInstance.get(`${apiPostfix}?$top=1`, {
        headers: { id: 0 },
    });
    const record = res.data.records && res.data.records[0];
    if (!record) return { options: [], labels: {} };
    // Try to use propertyLabel if available
    const labels = {};
    Object.entries(record).forEach(([key, value]) => {
        if (typeof value === "object" && value && value.propertyLabel) {
            labels[key] = value.propertyLabel;
        }
    });
    const options = filterColumns(record).map((opt) => ({
        value: opt.value,
        label: labels[opt.value] || opt.value,
    }));
    return { options, labels };
} 