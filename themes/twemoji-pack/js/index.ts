/**
 * Twemoji emoji pack.
 *
 * Every emoji that has an image in `assets/emoji` is drawn from it.
 * Images are named like Discord's: `emoji-<codepoints>.png`.
 * Generate them with `node tools/build-emoji.mjs <twemoji 72x72 folder>`.
 */

/// <reference types="@valenced/themes-api" />

export default plugin({
	preInit({ themes }) {
		themes.registerGroup('twemoji', {
			name: 'Twemoji',
			description: 'Twemoji emoji packs',
		})

		themes.registerEmojiPack('twemoji', 'twemoji', {
			name: 'Twemoji',
			description: 'Twemoji instead of your device emoji',
			images: 'assets/emoji',
		})
	},
})
