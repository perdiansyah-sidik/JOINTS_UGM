// Build salinan sumber aplikasi. Tidak mengubah environment/config repo utama.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const dir = path.join(__dirname, 'master-browser-preview');
fs.mkdirSync(dir, { recursive: true });
fs.cpSync(path.join(root, 'src'), path.join(dir, 'src'), { recursive: true });
for (const file of ['tsconfig.json', 'tsconfig.app.json', 'package.json']) {
  fs.copyFileSync(path.join(root, file), path.join(dir, file));
}
fs.writeFileSync(path.join(dir, 'src/environments/environment.ts'),
  "export const environment = { production: false, apiUrl: '/api' };\n");
const config = JSON.parse(fs.readFileSync(path.join(root, 'angular.json'), 'utf8'));
config.cli.analytics = false;
config.projects.app.architect.build.options.assets = config.projects.app.architect.build.options.assets.map(asset => {
  if (!asset.input.startsWith('node_modules/')) return asset;
  const name = 'preview-icons';
  fs.cpSync(path.join(root, asset.input), path.join(dir, name), { recursive: true });
  return { ...asset, input: name };
});
fs.writeFileSync(path.join(dir, 'angular.json'), JSON.stringify(config, null, 2));
const result = spawnSync(process.execPath,
  ['--max-old-space-size=2048', path.join(root, 'node_modules/@angular/cli/bin/ng.js'), 'build', '--configuration', 'development'],
  { cwd: dir, stdio: 'inherit', windowsHide: true,
    env: { ...process.env, NG_BUILD_MAX_WORKERS: '1' } });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
