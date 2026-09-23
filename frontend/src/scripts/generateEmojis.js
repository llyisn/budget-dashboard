import fs from 'node:fs/promises'

const response = await fetch(
  'https://www.unicode.org/Public/emoji/latest/emoji-test.txt'
)

if (!response.ok) {
  throw new Error(`Failed to download emoji data: ${response.status}`)
}

const text = await response.text()

const groups = []

let currentGroup = null

for (const line of text.split('\n')) {
  if (line.startsWith('# group:')) {
    const name = line.replace('# group:', '').trim().toLowerCase()

    currentGroup = {
      name,
      emojis: []
    }

    groups.push(currentGroup)
    continue
  }

  // Only include fully-qualified emojis
  if (!line.includes('; fully-qualified')) continue

  const [codePoints] = line.split(';')

  // Skip emojis containing skin-tone modifiers
  const hasSkinTone = codePoints
    .trim()
    .split(/\s+/)
    .some(code =>
      ['1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'].includes(code)
    )

  if (hasSkinTone) continue

  const hashIndex = line.indexOf('#')
  if (hashIndex === -1) continue

  const emoji = line
    .slice(hashIndex + 1)
    .trim()
    .split(/\s+/)[0]

  if (!emoji) continue

  currentGroup.emojis.push(emoji)
}

const output = `export const emojiCategories = ${JSON.stringify(
  groups,
  null,
  2
)}\n`

await fs.mkdir('./src/data', { recursive: true })

await fs.writeFile(
  './src/data/emojiCategories.js',
  output,
  'utf8'
)

console.log('Generated src/data/emojiCategories.js')