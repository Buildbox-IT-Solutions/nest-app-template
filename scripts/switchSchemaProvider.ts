import * as fs from 'fs';
import * as path from 'path';

const schemaPath = path.join(__dirname, '../prisma', 'schema.prisma');
const backupPath = path.join(__dirname, '../prisma', 'schema.backup.prisma');

function switchProvider(toSqlite: boolean): void {
  if (!fs.existsSync(schemaPath)) {
    console.error('The file schema.prisma was not found on path:', schemaPath);
    process.exit(1);
  }

  if (toSqlite) {
    fs.copyFileSync(schemaPath, backupPath);

    const schema = fs.readFileSync(schemaPath, 'utf-8');
    const datasourceRegex = /datasource db {\s*provider\s*=\s*"(.*?)"/;

    const match = schema.match(datasourceRegex);
    if (!match) {
      console.error('`datasource db` not found on schema.prisma.', schemaPath);
      process.exit(1);
    }

    const currentProvider = match[1];
    const updatedSchema = schema.replace(datasourceRegex, (substring) =>
      substring.replace(currentProvider, 'sqlite'),
    );
    fs.writeFileSync(schemaPath, updatedSchema, 'utf-8');
    return;
  }

  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, schemaPath);
    fs.unlink(backupPath, (err) => {
      if (err) console.log('Error: ', err);
    });
    return;
  }

  process.exit(1);
}

const mode = process.argv[2];

if (mode === 'toSqlite') switchProvider(true);
if (mode === 'restore') switchProvider(false);
if (!mode) process.exit(1);
