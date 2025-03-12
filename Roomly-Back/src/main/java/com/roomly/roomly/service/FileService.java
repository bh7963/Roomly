package com.roomly.roomly.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

public interface FileService {

    // 숙소 메인 파일 업로드
    String accommodationMainFileUpload(MultipartFile file);
    // 숙소 서브 파일 업로드
    String accommodationSubFileUpload(MultipartFile file);
    // 객실 메인 파일 업로드
    String roomMainImageFileUpload(MultipartFile file);
    // 숙소 서브 파일 업로드
    String roomSubFileUpload(MultipartFile file);
    // 사업자이미지 파일 업로드
    String businessFileUpload(MultipartFile file);

    // 숙소 메인 파일 가져오기
    Resource getAccommodationMainFile(String fileName);
    // 숙소 서브 파일 가져오기
    Resource getAccommodationSubFile(String fileName);
    // 객실 메인 파일 가져오기
    Resource getRoomMainFile(String fileName);
    // 객실 서브 파일 가져오기
    Resource getRoomSubFile(String fileName);
    // 사업자이미지 파일 가져오기
    Resource getBusinessFile(String fileName); 


    
}
