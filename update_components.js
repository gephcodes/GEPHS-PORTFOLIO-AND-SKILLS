const fs = require('fs');
const config = JSON.parse(fs.readFileSync('components.json', 'utf8'));
config.registries = [
  {
    "name": "reactbits-starter",
    "url": "https://pro.reactbits.dev/api/components/starter/registry.json",
    "headers": {
      "Authorization": "Bearer ${REACTBITS_LICENSE_KEY}"
    }
  }
];
fs.writeFileSync('components.json', JSON.stringify(config, null, 2));
