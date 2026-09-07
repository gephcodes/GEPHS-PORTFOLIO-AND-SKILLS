sed -i "/import Projects from '.\/components\/Projects';/a import Certificates from '.\/components\/Certificates';" src/App.tsx
sed -i "/<Projects \/>/a \          <Certificates \/>" src/App.tsx
