sed -i '/import NeuralTunnel from/d' src/App.tsx
sed -i 's/<NeuralTunnel className="w-full h-full opacity-70" glowColor="#003BFF" \/>/<NeuralTunnel className="w-full h-full opacity-100" glowColor="#003BFF" \/>/g' src/App.tsx
