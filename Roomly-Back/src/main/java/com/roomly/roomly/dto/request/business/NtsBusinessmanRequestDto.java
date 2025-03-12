package com.roomly.roomly.dto.request.business;

import java.util.ArrayList;
import java.util.List;

import com.roomly.roomly.common.object.Business;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NtsBusinessmanRequestDto {
    private List<Business> businesses;

    public NtsBusinessmanRequestDto(BusinessNumberCheckRequestDto dto) {
        List<Business> businesses = new ArrayList<>();
        Business business = new Business(dto);
        businesses.add(business);
        this.businesses = businesses;
    }
}
