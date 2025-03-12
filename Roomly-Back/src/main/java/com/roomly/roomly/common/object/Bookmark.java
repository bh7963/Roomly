package com.roomly.roomly.common.object;

import java.util.ArrayList;
import java.util.List;

import com.roomly.roomly.entity.BookmarkEntity;

import lombok.Getter;

@Getter
public class Bookmark {

    private String guestId;
    private String accommodationName;

    private Bookmark (BookmarkEntity bookmarkEntity) {
        this.guestId = bookmarkEntity.getGuestId();
        this.accommodationName = bookmarkEntity.getAccommodationName();
    }

    public static List<Bookmark> getList(List<BookmarkEntity> bookmarkEntities) {
        List<Bookmark> bookmarks = new ArrayList<>();

        for(BookmarkEntity bookmarkEntity :bookmarkEntities) {
            Bookmark bookmark = new Bookmark(bookmarkEntity);
            bookmarks.add(bookmark);
        }

        return bookmarks;
    }
}
