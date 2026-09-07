#!/bin/bash
find src -type f -name "*.tsx" -exec sed -i -E 's/text-(zinc|neutral|amber|emerald|blue)-[0-9]{3}/text-black/g' {} +
find src -type f -name "*.tsx" -exec sed -i -E 's/text-\[\#[0-9a-fA-F]+\]/text-black/g' {} +
find src -type f -name "*.tsx" -exec sed -i -E 's/text-white/text-black/g' {} +
find src -type f -name "*.tsx" -exec sed -i -E 's/hover:text-(zinc|neutral|amber|emerald|blue)-[0-9]{3}/hover:text-black/g' {} +
find src -type f -name "*.tsx" -exec sed -i -E 's/hover:text-\[\#[0-9a-fA-F]+\]/hover:text-black/g' {} +
find src -type f -name "*.tsx" -exec sed -i -E 's/hover:text-white/hover:text-black/g' {} +
