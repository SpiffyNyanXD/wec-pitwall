import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
export default defineConfig(({mode})=>{const env=loadEnv(mode,process.cwd(),'');return {define:{'import.meta.env.VITE_SUPABASE_URL':JSON.stringify(env.VITE_SUPABASE_URL||''),'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY':JSON.stringify(env.VITE_SUPABASE_PUBLISHABLE_KEY||'')},server:{host:'127.0.0.1',port:8080},plugins:[react()],build:{sourcemap:false},resolve:{alias:{'@':path.resolve(__dirname,'./src')}}};});
