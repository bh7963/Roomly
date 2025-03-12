package com.roomly.roomly.entity;

import com.roomly.roomly.dto.request.guest.AddBookMarkRequestDto;
import com.roomly.roomly.entity.pk.BookmarkPk;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Bookmark")
@Table(name = "Bookmark")
@IdClass(BookmarkPk.class)
public class BookmarkEntity {
    
    @Id
    private String guestId;
    private String accommodationName;

    public BookmarkEntity(AddBookMarkRequestDto dto){
        this.guestId = dto.getGuestId();
        this.accommodationName = dto.getAccommodationName();
    }

}