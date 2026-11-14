#!/usr/bin/env node
// Usage: node tools/build-emoji.mjs <folder with twemoji PNGs> [out folder]
// Example: node tools/build-emoji.mjs ~/twemoji/assets/72x72 assets/emoji
//
// Twemoji names files by codepoints: "1f600.png", "1f468-200d-1f469-200d-1f467.png".
// Valenced wants "emoji-<codepoints>.png". Check SEP and ADD_FE0F against the
// filenames in the example pack's assets/emoji folder and adjust if they differ.

import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SEP = '-'          // separator between codepoints in a multi-codepoint name
const ADD_FE0F = false   // also write a "<cp>-fe0f" copy of single-codepoint emoji
                         // (set true if the example's heart is "emoji-2764-fe0f.png")

const [src, out = 'assets/emoji'] = process.argv.slice(2)
if (!src) {
	console.error('Usage: node tools/build-emoji.mjs <twemoji png folder> [out folder]')
	process.exit(1)
}

mkdirSync(out, { recursive: true })
let n = 0
for (const file of readdirSync(src)) {
	if (!file.endsWith('.png')) continue
	const cps = file.slice(0, -4).split('-')
	const write = (parts) => {
		copyFileSync(join(src, file), join(out, `emoji-${parts.join(SEP)}.png`))
		n++
	}
	write(cps)
	if (ADD_FE0F && cps.length === 1) write([...cps, 'fe0f'])
}
console.log(`Wrote ${n} files to ${out}`)
