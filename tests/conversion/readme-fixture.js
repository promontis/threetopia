import {renderReadme} from '../../src/creators/package-readme.ts';
renderReadme(document.getElementById('readme'),'# Package composition\n\n**Dependencies**\n\n- `@dgreenheck/tidewater-ocean`\n\n```js\nconst ocean = new OceanFFT(renderer);\n```\n\n<script>window.readmeAttack=true</script>\n\n[bad](javascript:alert(1)) [safe](https://docs.threetopia.com/packages)');
