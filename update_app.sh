sed -i "s/import Skills from '.\/components\/Skills';//g" src/App.tsx
sed -i "s/<Skills \/>//g" src/App.tsx
sed -i "s/{.*02 - Core Capabilities Matrix.*}//g" src/App.tsx

sed -i "s/import Navbar from '.\/components\/Navbar';/import Navbar from '.\/components\/Navbar';\nimport NeuralTunnel from '.\/components\/ui\/neural-tunnel';/g" src/App.tsx

sed -i 's/<div className="min-h-screen bg-\[#FDFBF7\] font-sans text-black antialiased selection:bg-\[#003BFF\] selection:text-black">/<div className="min-h-screen bg-\[#FDFBF7\] font-sans text-black antialiased selection:bg-\[#003BFF\] selection:text-black relative">\n      <div className="fixed inset-0 z-0 pointer-events-none">\n        <NeuralTunnel className="w-full h-full opacity-70" glowColor="#003BFF" \/>\n      <\/div>\n      <div className="relative z-10">/g' src/App.tsx

sed -i 's/    <\/div>/      <\/div>\n    <\/div>/g' src/App.tsx

