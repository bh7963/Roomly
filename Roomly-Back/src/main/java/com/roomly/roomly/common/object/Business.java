package com.roomly.roomly.common.object;

import com.roomly.roomly.dto.request.business.BusinessNumberCheckRequestDto;
import com.roomly.roomly.entity.HostEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Business {

    private String b_no;
    private String start_dt;
    private String p_nm;

    public Business(HostEntity hostEntity){
        this.b_no = hostEntity.getHostBusinessNumber();
        this.start_dt=hostEntity.getBusinessStartDay();
        this.p_nm = hostEntity.getBusinessName();
    }

    public Business(BusinessNumberCheckRequestDto dto) {
        this.b_no = dto.getB_no();
        this.p_nm = dto.getP_nm();
        this.start_dt = dto.getStart_dt();
    }

}
