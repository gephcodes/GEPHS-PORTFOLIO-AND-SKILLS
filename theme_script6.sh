sed -i "s/ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';/ctx.fillStyle = 'rgba(253, 251, 247, 0.4)';/g" src/components/ui/neural-tunnel.tsx
sed -i 's/bg-black/bg-[#FDFBF7]/g' src/components/ui/neural-tunnel.tsx
sed -i 's/via-black\/50 to-black/via-[#FDFBF7]\/50 to-[#FDFBF7]/g' src/components/ui/neural-tunnel.tsx
sed -i "s/ctx.globalCompositeOperation = 'screen';/ctx.globalCompositeOperation = 'source-over';/g" src/components/ui/neural-tunnel.tsx
