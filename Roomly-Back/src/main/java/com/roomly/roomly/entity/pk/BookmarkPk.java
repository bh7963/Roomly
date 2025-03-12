package com.roomly.roomly.entity.pk;
import java.io.Serializable;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkPk implements Serializable {
    

    @Column(name="guest_id")
    String guestId;
    @Column(name="accommodation_name")
    String accommodationName;
}
