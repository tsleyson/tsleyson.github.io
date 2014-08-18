var sorter = {
    sortBy : function (tableID, by) {
        // tableID is the id of the table you want to sort.
        // by is the string "anime" or "manga".
        if (by !== "anime" && by !== "manga") {
            throw new Error("Invalid sort field: " + by);
        }
        var table = $('#' + tableID);
        var rows = $('#' + tableID + " tbody tr");
        var key = by === "anime"? keyFunctions.animeInfo :
            keyFunctions.mangaInfo;
        var keyFn = keyFunctions.compareRows(key);
        try {
             rows.sort(keyFn);
        } catch (exc) {
            alert(exc);
        }
        $.each(rows, function(index, row) {
            table.children('tbody').append(row);
        });
    }
}
