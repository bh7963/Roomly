package com.roomly.roomly.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.roomly.roomly.service.FileService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/roomly/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // 숙소 메인 이미지 파일 업로드 api
    @PostMapping("/upload/accommodationMain")
    public String accommodationMainFileUpload(
            @RequestParam("file") MultipartFile file) {
        String url = fileService.accommodationMainFileUpload(file);
        return url;
    }

    // 숙소 서브 이미지 파일 업로드 api
    @PostMapping("/upload/accommodationSub")
    public String accommodationSubFileUpload(
            @RequestParam("file") MultipartFile file) {
        String url = fileService.accommodationSubFileUpload(file);
        return url;
    }

    // 객실 메인 이미지 파일 업로드 api
    @PostMapping("/upload/roomMain")
    public String roomMainFileUpload(
            @RequestParam("file") MultipartFile file) {
        String url = fileService.roomMainImageFileUpload(file);
        return url;
    }

    // 객실 서브 이미지 파일 업로드 api
    @PostMapping("/upload/roomSub")
    public String roomSubFileUpload(
            @RequestParam("file") MultipartFile file) {
        String url = fileService.roomSubFileUpload(file);
        return url;
    }

    // 사업자 인증 서류 파일 업로드 api
    @PostMapping("/upload/business")
    public String businessFileUpload(
            @RequestParam("file") MultipartFile file) {
        String url = fileService.businessFileUpload(file);
        return url;
    }

    // 이미지 가져오기 api
    @GetMapping(value = "/{fileName}", produces = { MediaType.IMAGE_PNG_VALUE,
            MediaType.IMAGE_JPEG_VALUE })
    public Resource getAccommodationMainImage(
            @PathVariable("fileName") String fileName) {
        Resource resource = fileService.getAccommodationMainFile(fileName);
        return resource;
    }

}
