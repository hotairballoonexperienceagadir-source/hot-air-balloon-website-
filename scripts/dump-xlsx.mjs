import XLSX from 'xlsx';

const FILE = '/home/z/my-project/upload/SEO_Plan_Hot_Air_Balloon_Morocco.xlsx';
const wb = XLSX.readFile(FILE);

console.log('SHEETS:', JSON.stringify(wb.SheetNames));

for (const name of wb.SheetNames) {
  const ws = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false });
  console.log('\n================ SHEET:', name, '| rows:', rows.length);
  const head = rows[0] || [];
  console.log('HEADER:', JSON.stringify(head));
  for (let i = 1; i < Math.min(rows.length, 4); i++) {
    const r = rows[i];
    const pairs = head.map((h, idx) => (r[idx] !== undefined && r[idx] !== '' ? `${h}=${String(r[idx]).slice(0, 90)}` : null)).filter(Boolean);
    console.log(`ROW${i}:`, pairs.join(' | ').slice(0, 900));
  }
}
