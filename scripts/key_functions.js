// These functions determine an ordering for table rows in the
// Aria correspondence table. (Or are utilities or data for that purpose.)
var keyFunctions = {
    mangaOrd : {"Aqua" : 0, "Aria" : 1},
    animeOrd : {"Aria the Animation"   : 0,
                "Aria the Natural"     : 1,
                "Aria the Origination" : 2,
                ""                     : 3},
    extractNumber: function(str, checks) {
        // str is the string to extract a number from.
        // checks is an array of regexps to try. It must
        // have the key-capturing group as its first group.
        for (var i = 0; i < checks.length; ++i) {
            var m = str.match(checks[i]);
            if (m) {
                return parseInt(m[1]);
            }
        }
        // Nothing matches.
        throw new Error("extractNumber: " +
                        str + " does not match any check.");
    },
    /* Get sort keys from table row. */
    animeInfo : function(row) {
        // Anime series and episode can be empty.
        var series = $('td.anime_series', row).text();
        if (!series) {
            series = "";
        }
        var episode = keyFunctions.extractNumber(
            $('td.anime_episode', row).text(),
            [/Episode\s+(\d+)/, /.?/]);
        if (episode <= 0) {
            throw new Error("Episode " + episode + " <= 0");
        }
        return {series : keyFunctions.animeOrd[series],
                number : episode};
    },
    mangaInfo : function(row) {
        // Manga series and chapter should never be empty.
        var series = $('td.manga_series', row).text();
        if (!series) {
            throw new Error(row + " doesn't have a series somehow.");
            // Not having a series means I screwed up writing the HTML.
        }
        var chapterName = $('td.chapter_name', row).text();
        if (!chapterName) {
            throw new Error(row + " doesn't have a manga chapter.");
        }
        var chapter = keyFunctions.extractNumber(
            chapterName,
            [/Navigation\s+(\d+)/,
             /(?:Special|Bonus)\s+Navigation\s+\([vV]ol\.?\s+(\d+)\)/]);
        if (chapter <= 0) {
            throw new Error("Chapter " + chapter + " <= 0");
        }
        return {series : keyFunctions.mangaOrd[series],
                number : chapter};
    },
    compareRows : function (keyExtractor) {
        // Get a function that compares with keyExtractor.
        return function(r1, r2) {
            var k1 = keyExtractor(r1);
            var k2 = keyExtractor(r2);
            var seriesComp = k1.series - k2.series;
            if (seriesComp !== 0) {  // Chapters in different series.
                return seriesComp;
            }
            return k1.number - k2.number;
        }
    }
};
