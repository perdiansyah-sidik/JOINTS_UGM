const fs = require('node:fs');
const path = require('node:path');
const dir='_review/master-build-check';
const routeFile=dir+'/src/app/app-routing.module.ts';
let route=fs.readFileSync(routeFile,'utf8');
route=route.replace('const routes: Routes = [',`const routes: Routes = [
  { path: 'master-pengguna', loadChildren: () => import('./master-pengguna/master-pengguna.module').then(m => m.MasterPenggunaPageModule) },`);
fs.writeFileSync(routeFile,route);
const config=JSON.parse(fs.readFileSync(dir+'/angular.json','utf8'));
config.cli.analytics=false;
config.projects.app.architect.build.options.assets=config.projects.app.architect.build.options.assets.map(a => a.input.startsWith('node_modules') ? {...a,input:path.resolve(a.input).replaceAll('\\','/')} : a);
fs.writeFileSync(dir+'/angular.json',JSON.stringify(config,null,2));
