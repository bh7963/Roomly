package com.roomly.roomly.dto.request.business;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BusinessNumberCheckRequestDto {

    private String b_no;

    private String start_dt;

    private String p_nm;

    private String b_sector;

}