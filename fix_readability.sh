# Fix text color in blue boxes (Footer)
sed -i 's/bg-\[\#003BFF\] p-6 rounded-none space-y-4 max-w-md mx-auto text-left/bg-\[\#003BFF\] p-6 rounded-none space-y-4 max-w-md mx-auto text-left text-white/g' src/components/Footer.tsx
sed -i 's/text-black hover:bg-blue-700/text-white hover:bg-blue-700/g' src/components/Footer.tsx

# Fix Navbar blue button
sed -i 's/bg-\[\#003BFF\] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-black/bg-\[\#003BFF\] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white/g' src/components/Navbar.tsx

# Make sure all children of the blue box in Footer use text-white instead of text-black
sed -i '/bg-\[\#003BFF\]/,/<\/div>/ s/text-black/text-white/g' src/components/Footer.tsx

# Remove "01 — Projects & Digital Assets" -> "Projects & Digital Assets"
sed -i 's/01 — Projects/Projects/g' src/components/Projects.tsx

# Remove "05" from footer
sed -i '/05/d' src/components/Footer.tsx

# Remove card numbers 01 to 06
sed -i '/>01<\/span>/d' src/components/Projects.tsx
sed -i '/>02<\/span>/d' src/components/Projects.tsx
sed -i '/>03<\/span>/d' src/components/Projects.tsx
sed -i '/>04<\/span>/d' src/components/Projects.tsx
sed -i '/>05<\/span>/d' src/components/Projects.tsx
sed -i '/>06<\/span>/d' src/components/Projects.tsx

