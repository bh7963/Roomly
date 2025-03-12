package com.roomly.roomly.common.object;
import java.util.ArrayList;
import java.util.List;

import com.roomly.roomly.entity.UseInformationEntity;

import lombok.Getter;

@Getter
public class UseInformation {
    private Integer autoKey;
    private String title;
    private String context;

    private UseInformation(UseInformationEntity useInformationEntity){
        this.autoKey = useInformationEntity.getAutoKey();
        this.title = useInformationEntity.getTitle();
        this.context = useInformationEntity.getContext();
    }

    public static List<UseInformation> getUseInformation(List<UseInformationEntity> useInformationEntities){
        List<UseInformation> useInformations = new ArrayList<>();
        for (UseInformationEntity useInformationEntity : useInformationEntities){
            UseInformation useInformation = new UseInformation(useInformationEntity);
            useInformations.add(useInformation);
        }
        return useInformations;
    }
}