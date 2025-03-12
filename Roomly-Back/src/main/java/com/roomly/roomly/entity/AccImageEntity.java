package com.roomly.roomly.entity;

import com.roomly.roomly.entity.pk.AccImagePk;

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
@Entity(name = "accImage")
@Table(name = "acc_image")
@IdClass(AccImagePk.class)
public class AccImageEntity {
    @Id
    private String accommodationName;
    @Id
    private String accommodationImage;

}
