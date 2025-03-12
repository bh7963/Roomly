package com.roomly.roomly.common.object;

import com.roomly.roomly.entity.GuestEntity;
import java.util.List;
import java.util.ArrayList;

import lombok.Getter;

@Getter
public class Guest {

    private String guestId;
    private String guestName;
    private String guestTelNumber;

    public Guest(GuestEntity guestEntity) {
        this.guestId = guestEntity.getGuestId();
        this.guestName = guestEntity.getGuestName();
        this.guestTelNumber = guestEntity.getGuestTelNumber();
    }

    public static List<Guest> getGuests(List<GuestEntity> guestEntities) {
        List<Guest> guests = new ArrayList<>();
        for (GuestEntity guestEntity : guestEntities) {
            Guest guest = new Guest(guestEntity);
            guests.add(guest);
        }
        return guests;
    }

}
