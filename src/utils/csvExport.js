export function exportEventLogToCSV(eventLog) {
  if (!eventLog || eventLog.length === 0) return;

  const headers = [
    'Event ID',
    'Timestamp',
    'Unit ID',
    'Unit Name',
    'Event Type',
    'Details (Simulated)',
    'Water Volume (L)',
    'Flow Rate (L/min)'
  ];

  const escapeCSV = (val) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = eventLog.map((row) => [
    escapeCSV(row.id),
    escapeCSV(row.timestamp),
    escapeCSV(row.unitId),
    escapeCSV(row.unitName),
    escapeCSV(row.type),
    escapeCSV(row.details),
    escapeCSV(row.volumeLiters),
    escapeCSV(row.flowRateLpm)
  ]);

  const csvContent = [
    '# Team Sankalp - Eureka Junior Innovation (Simulation-Only Telemetry Export)',
    headers.join(','),
    ...rows.map((r) => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `team-sankalp-simulation-log-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
