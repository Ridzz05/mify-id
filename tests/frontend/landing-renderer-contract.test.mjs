import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const renderer = await readFile(new URL('../../resources/js/Pages/Welcome.jsx', import.meta.url), 'utf8');
const studio = await readFile(new URL('../../resources/js/Pages/SiteStudio/Index.jsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../../resources/css/app.css', import.meta.url), 'utf8');

assert.match(renderer, /revertOnUpdate:\s*true/, 'GSAP updates must revert previous transforms and triggers');
assert.doesNotMatch(renderer, /y:\s*(?:20|28)\s*\*\s*intensity/, 'motion must not translate layout-bearing regions');
assert.doesNotMatch(renderer, /clipPath:/, 'motion must not clip inline headline/highlight content');
assert.match(renderer, /previewViewport/, 'preview must pass its selected viewport into the shared renderer');
assert.match(renderer, /landing-renderer--compact-preview/, 'compact preview must use a structural responsive mode');
assert.match(renderer, /whitespace-pre-line/, 'headline line breaks must be preserved by the public renderer');
assert.match(renderer, /min-w-0/, 'text-bearing grid regions must be allowed to shrink safely');
assert.match(styles, /landing-renderer--mobile-preview/, 'mobile preview must collapse responsive structures safely');
assert.match(studio, /previewViewport=\{viewport\}/, 'Site Studio must provide the selected viewport to the renderer');
assert.match(studio, /Mark \+ new line/, 'Studio must provide a controlled line-break action for marked headlines');

console.log('Landing renderer contract: PASS');
