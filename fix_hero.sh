sed -i '/import NeuralTunnel from/d' src/components/Hero.tsx
sed -i '/<NeuralTunnel/d' src/components/Hero.tsx
sed -i 's/bg-\[#FDFBF7\]/bg-transparent/g' src/components/Hero.tsx
