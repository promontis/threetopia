#!/usr/bin/env node
import {printError} from '../lib/output.js';
try { await import('../lib/main.js'); }
catch (error) { printError(error, process.argv[2] || 'help', process.argv.includes('--json')); }
