package com.roomly.roomly.service.implement;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import com.roomly.roomly.service.FileService;

@Service
public class FileServiceImplement implements FileService {

    @Value("${file.path.accommodation.main}")
    private String accommodationMainFilePath;
    @Value("${file.path.accommodation.sub}")
    private String accommodationSubFilePath;
    @Value("${file.path.room.main}")
    private String roomMainFilePath;
    @Value("${file.path.room.sub}")
    private String roomSubFilePath;
    @Value("${file.path.business}")
    private String businessFilePath;

    @Value("${file.url}")
    private String fileUrl;

    // 숙소 메인 파일 업로드 메서드
    @Override
    public String accommodationMainFileUpload(MultipartFile file) {

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = accommodationMainFilePath + saveFileName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = fileUrl + saveFileName;
        return url;
    }

    // 숙소 서브 파일 업로드 메서드
    @Override
    public String accommodationSubFileUpload(MultipartFile file) {

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = accommodationSubFilePath + saveFileName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = fileUrl + saveFileName;
        return url;
    }

    // 객실 메인 파일 업로드 메서드
    @Override
    public String roomMainImageFileUpload(MultipartFile file){

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = roomMainFilePath + saveFileName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = fileUrl + saveFileName;
        return url;
    }

    // 객실 서브 파일 업로드 메서드
    @Override
    public String roomSubFileUpload(MultipartFile file) {

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = roomSubFilePath + saveFileName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = fileUrl + saveFileName;
        return url;
    }

    // 사업자 관련 파일 업로드 메서드
    @Override
    public String businessFileUpload(MultipartFile file) {

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = businessFilePath + saveFileName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        String url = fileUrl + saveFileName;
        return url;
    }
    
    // 숙소 메인 파일 가져오기 메서드
    @Override
    public Resource getAccommodationMainFile(String fileName) {
        
        Resource resource = null;
        
        try {
            resource = new UrlResource("file:" + accommodationMainFilePath + fileName);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }


    // 숙소 서브 파일 가져오기 메서드
    @Override
    public Resource getAccommodationSubFile(String fileName) {
        Resource resource = null;
        
        try {
            resource = new UrlResource("file:" + accommodationSubFilePath + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }

    // 객실 메인 파일 가져오기 메서드
    @Override
    public Resource getRoomMainFile(String fileName) {
        Resource resource = null;
        
        try {
            resource = new UrlResource("file:" + roomMainFilePath + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }

    // 객실 서브 파일 가져오기 메서드
    @Override
    public Resource getRoomSubFile(String fileName) {
        Resource resource = null;
        
        try {
            resource = new UrlResource("file:" + roomSubFilePath + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }

    // 사업자 파일 가져오기 메서드
    @Override
    public Resource getBusinessFile(String fileName) {
        Resource resource = null;
        
        try {
            resource = new UrlResource("file:" + businessFilePath + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }
    
    
}


    
    

