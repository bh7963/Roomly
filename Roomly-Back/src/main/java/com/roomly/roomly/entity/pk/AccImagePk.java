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
public class AccImagePk implements Serializable {
    
    @Column(name="accommodation_name")
    String accommodationName;
    @Column(name="accommodation_image")
    String accommodationImage;
}
