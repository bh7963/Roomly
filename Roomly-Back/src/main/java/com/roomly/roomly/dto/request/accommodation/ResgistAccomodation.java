package com.roomly.roomly.dto.request.accommodation;

import java.util.List;

import com.roomly.roomly.dto.request.room.PostRoomRequestDto;

import com.roomly.roomly.dto.request.useInformations.PostUseInformationRequestDto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResgistAccomodation {


    private PostAccommodationReqeustDto accommodationReqeustDto;

    private List<String> accommodationImages; // 숙소 서브 이미지

    private List<PostUseInformationRequestDto> useInformations;

    private List<PostRoomRequestDto> roomRequestDtoList;
    
}
