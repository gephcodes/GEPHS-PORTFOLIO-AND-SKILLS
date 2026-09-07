sed -i '/const navItems = \[/,/\];/d' src/components/Navbar.tsx
sed -i "/export default function Navbar/i \
const navItems = [\n    { label: 'Projects', href: '#projects' },\n    { label: 'Work with me', href: '#work' },\n    { label: 'Contact', href: '#contact' }\n  ];" src/components/Navbar.tsx
