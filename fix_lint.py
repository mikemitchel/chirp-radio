#!/usr/bin/env python3
"""
Script to fix common linting errors in the CHIRP Radio codebase.
Handles unused variables by prefixing with underscore and removing unused imports.
"""

import re
import sys
from pathlib import Path

# Files and their fixes (line_number, old_text, new_text)
fixes = {
    "src/components/CrRecentlyPlayed.tsx": [
        (138, "(_item, _index) =>", "(_item, _) =>"),
    ],
    "src/components/HeroCarousel.tsx": [
        (69, "(slide, _index) =>", "(slide, _) =>"),
        (136, "(_, _index) => (", "() => ("),
    ],
    "src/components/LoginRequiredModal.tsx": [
        (46, "const validateEmail = (email: string): boolean => {", "// Email validation disabled for now\n  // const validateEmail = (email: string): boolean => {"),
    ],
    "src/hooks/useLoginRequired.ts": [
        (18, "(email, password) =>", "(email, _password) =>"),
        (34, "(email, password) =>", "(email, _password) =>"),
    ],
    "src/pages/AboutPage.tsx": [
        (10, "const [announcements,", "const [/* announcements */,"),
    ],
    "src/pages/AccountSettings.tsx": [
        (198, "(_event, _checked) =>", "(_event, _) =>"),
        (276, "(email, _password) =>", "(email, _) =>"),
        (287, "(email, _password) =>", "(email, _) =>"),
    ],
    "src/pages/ArticleDetailPage.tsx": [
        (13, "const { id } =", "const { id: _ } ="),
    ],
    "src/pages/BecomeVolunteerPage.tsx": [
        (7, "import CrButton from", "// import CrButton from"),
    ],
    "src/pages/DJDetailPage.tsx": [
        (11, "import CrChip from", "// import CrChip from"),
    ],
    "src/pages/DJSchedulePage.tsx": [
        (8, "import { useArticles, useEvents, useCurrentUser, useDJs } from", "import { useArticles, useEvents, useDJs } from"),
    ],
    "src/pages/EventDetailPage.tsx": [
        (16, "const { id } =", "const { id: _ } ="),
    ],
    "src/pages/ForbiddenPage.tsx": [
        (6, "import CrPageHeader from", "// import CrPageHeader from"),
    ],
    "src/pages/LeadershipDirectoryPage.tsx": [
        (4, "import CrBreadcrumb from", "// import CrBreadcrumb from"),
        (32, "const breadcrumbItems =", "// const breadcrumbItems ="),
    ],
    "src/pages/ListenPage.tsx": [
        (7, "import CrPlaylistItem from", "// import CrPlaylistItem from"),
        (81, "(track, index) =>", "(track, _) =>"),
        (151, "const weeksAddsTracks =", "// const weeksAddsTracks ="),
        (448, "const collectionTracks =", "// const collectionTracks ="),
    ],
    "src/pages/MakeRequest.tsx": [
        (44, "(email, _password) =>", "(email, _) =>"),
        (54, "(email, _password) =>", "(email, _) =>"),
    ],
    "src/pages/NotFoundPage.tsx": [
        (14, "import CrPageHeader from", "// import CrPageHeader from"),
    ],
    "src/pages/OtherWaysToGivePage.tsx": [
        (5, "import CrBreadcrumb from", "// import CrBreadcrumb from"),
    ],
    "src/pages/OtherWaysToListenPage.tsx": [
        (5, "import CrBreadcrumb from", "// import CrBreadcrumb from"),
    ],
    "src/pages/PlaylistPage.tsx": [
        (17, "const [currentShow,", "const [/* currentShow */,"),
        (96, "map((_, index) =>", "map((_, _index) =>"),
    ],
    "src/pages/PodcastDetailPage.tsx": [
        (14, "const { id } =", "const { id: _ } ="),
    ],
    "src/pages/RecentlyPlayed.tsx": [
        (13, "const samplePlaylistItems =", "// const samplePlaylistItems ="),
        (201, "(track, index) =>", "(track, _) =>"),
        (241, "(email, _password) =>", "(email, _) =>"),
        (251, "(email, _password) =>", "(email, _) =>"),
    ],
    "src/pages/RequestSongPage.tsx": [
        (4, "import CrPageHeader from", "// import CrPageHeader from"),
    ],
    "src/pages/ServerErrorPage.tsx": [
        (6, "import CrPageHeader from", "// import CrPageHeader from"),
    ],
    "src/pages/SitemapPage.tsx": [
        (96, "map((_, _index) =>", "map(() =>"),
    ],
    "src/pages/VolunteerDirectoryPage.tsx": [
        (4, "import CrBreadcrumb from", "// import CrBreadcrumb from"),
        (32, "const breadcrumbItems =", "// const breadcrumbItems ="),
    ],
    "src/pages/YourCollection.tsx": [
        (24, "const sampleCollectionItems =", "// const sampleCollectionItems ="),
        (88, "const { user } =", "const { /* user */ } ="),
        (132, "(track, index) =>", "(track, _) =>"),
        (161, "(email, _password) =>", "(email, _) =>"),
        (171, "(email, _password) =>", "(email, _) =>"),
        (246, "(item, _index) =>", "(item, _) =>"),
    ],
}

print("Linting errors will be fixed by running eslint --fix and manual code changes.")
print("This script is for reference only. Please use the Edit tool to make actual changes.")
