package com.roomly.roomly.entity;

import com.roomly.roomly.dto.request.useInformations.PatchUseInformationRequestDto;
import com.roomly.roomly.dto.request.useInformations.PostUseInformationRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="useInformation")
@Table(name="use_information")
public class UseInformationEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer autoKey;
    private String accommodationName;
    private String title;
    private String context;

    public UseInformationEntity(PostUseInformationRequestDto dto){
        this.accommodationName = dto.getAccommodationName();
        this.title = dto.getTitle();
        this.context = dto.getContext();
    }

    public void patch(PatchUseInformationRequestDto dto){
        this.title = dto.getTitle();
        this.context = dto.getContext();
    }
}
