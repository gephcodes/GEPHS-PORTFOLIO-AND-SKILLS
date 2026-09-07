sed -i 's/bg-\[#FDFBF7\]/bg-transparent/g' src/components/Projects.tsx
sed -i '/<ShapeGrid/,/\/>/d' src/components/Projects.tsx
sed -i '/import ShapeGrid/d' src/components/Projects.tsx

sed -i 's/bg-\[#FDFBF7\]/bg-transparent/g' src/components/Footer.tsx
sed -i '/<ShapeGrid/,/\/>/d' src/components/Footer.tsx
sed -i '/import ShapeGrid/d' src/components/Footer.tsx

sed -i '/{ label: .\+Skills.\+, href: .\+#skills.\+ },/d' src/components/Navbar.tsx
