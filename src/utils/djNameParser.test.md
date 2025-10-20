# DJ Name Parser Testing Guide

This utility handles the parsing of DJ and show names from the API, which may come in different formats.

## How it Works

The parser checks for show names in this order:
1. **If `show` field exists in API** → Use the show name as-is
2. **If `dj` field contains a colon** → Split on colon, parse as `"DJ Name: Show Name"`
3. **Otherwise** → Use DJ name as-is with empty show name

## Test Cases

### Test in Browser Console

You can test the parser in the browser console:

```javascript
// Import the parser (if not already available)
import { parseDjAndShowName } from './utils/djNameParser'

// Test Case 1: Show name exists in API (should use show name as-is)
console.log(parseDjAndShowName('Blake Cooper', 'Friday Morning Kickoff'))
// Expected: { djName: 'Blake Cooper', showName: 'Friday Morning Kickoff' }

// Test Case 2: No show name, DJ name has colon (should split)
console.log(parseDjAndShowName('Nicole Oppenheim: Ear Candy', ''))
// Expected: { djName: 'Nicole Oppenheim', showName: 'Ear Candy' }

// Test Case 3: No show name, DJ name has no colon (should use DJ name only)
console.log(parseDjAndShowName('DJ Current', ''))
// Expected: { djName: 'DJ Current', showName: '' }

// Test Case 4: Show name exists AND DJ name has colon (should prefer API show name)
console.log(parseDjAndShowName('Name: ShowInDJ', 'ShowInAPI'))
// Expected: { djName: 'Name: ShowInDJ', showName: 'ShowInAPI' }
```

### Test with Fake Data

The fake data in `/src/data/playlists.json` includes test cases:

1. **Track at 5:56am** - Normal case with separate show name
   - DJ: "DJ Current"
   - Show: "The Current Show"
   - Expected: DJ="DJ Current", Show="The Current Show"

2. **Track at 5:54am** - Colon-separated case
   - DJ: "Nicole Oppenheim: Ear Candy"
   - Show: "" (empty)
   - Expected: DJ="Nicole Oppenheim", Show="Ear Candy"

### Viewing in the App

1. **Go to Playlist page** (`/playlist`) - Track list shows DJ and show names
2. **Check Now Playing** (mobile app or header) - Should display parsed DJ/show
3. **Look at Recently Played** - Should show parsed names in track history

### Testing with Live API

When the API returns data like:
```json
{
  "now_playing": {
    "dj": "Nicole Oppenheim: Ear Candy",
    "show": "",
    ...
  }
}
```

The parser will automatically split it to:
- DJ Name: "Nicole Oppenheim"
- Show Name: "Ear Candy"

## Implementation Details

- **AudioPlayerContext**: Parses API data at fetch time
- **useData.ts (useTracks)**: Parses fake JSON data for local testing
- **CrCurrentDj**: Receives already-parsed djName and showName props

## Edge Cases Handled

1. Multiple colons in DJ name: `"DJ: Show: Subtitle"` → DJ="DJ", Show="Show: Subtitle"
2. Whitespace around colons: `"DJ : Show"` → DJ="DJ", Show="Show"
3. Empty strings: Both empty → Returns empty strings
4. Null/undefined: Treated as empty strings
