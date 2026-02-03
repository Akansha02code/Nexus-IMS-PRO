export const exportToCSV = (data, filename, headers) => {
    if (!data || !data.length) {
        alert("No data available to export.");
        return;
    }

    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const cell = row[header] === undefined || row[header] === null ? '' : row[header];
                // Handle strings with commas by wrapping in quotes
                const cellStr = String(cell).replace(/"/g, '""');
                return `"${cellStr}"`;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
