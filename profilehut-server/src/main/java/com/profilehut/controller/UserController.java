package com.profilehut.controller;

import com.profilehut.payload.request.AppUserSearchRequest;
import com.profilehut.payload.response.ApiResponse;
import com.profilehut.payload.response.AppUserResponse;
import com.profilehut.payload.response.AppUserSearchResponse;
import com.profilehut.service.AppUserService;
import com.profilehut.service.ElasticAppUserService;
import com.profilehut.exception.ResourceNotFoundException;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final AppUserService appUserService;
    private final ElasticAppUserService elasticAppUserService;

    @Autowired
    public UserController(AppUserService appUserService, ElasticAppUserService elasticAppUserService) {
        this.appUserService = appUserService;
        this.elasticAppUserService = elasticAppUserService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfileById(@PathVariable("id") Long id) {
        Map<String, AppUserResponse> userMap = appUserService.getUserProfile(id);
        if (userMap.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse(false, new ResourceNotFoundException("User", "id", id)
                    .getLocalizedMessage()));
        }
        return ResponseEntity.ok(new ApiResponse(true, userMap));
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> getAppUsersByKeyword(@PathVariable("keyword") final String keyword,
                                                  @RequestParam @NonNull Map<String, String> params) {
        Pageable pageable = PageRequest.of(Integer.parseInt(params.get("pageNum")),
                Integer.parseInt(params.get("pageSize")));
        Object[] fields = ArrayUtils.removeElement(params.values().toArray(), params.get("pageNum"));
        fields = ArrayUtils.removeElement(fields, params.get("pageSize"));
        Map<String, AppUserSearchResponse> appUserSearchResponseMap = elasticAppUserService
                .findUsersByKeyword(keyword, pageable, Arrays.copyOf(fields, fields.length, String[].class));
        AppUserSearchResponse appUserSearchResponse = appUserSearchResponseMap.get("userList");
        return ResponseEntity.ok(new ApiResponse(true, appUserSearchResponse));
    }

    @PostMapping("/search")
    public ResponseEntity<?> findAppUsersByKeyword(@RequestBody @NonNull AppUserSearchRequest appUserSearchRequest) {

        if (appUserSearchRequest.getKeyword().isEmpty()) {
            return ResponseEntity.ok(new ApiResponse(false, "No results found"));
        }

        Pageable pageable = PageRequest.of(appUserSearchRequest.getPagingOptions().getOffset(),
                appUserSearchRequest.getPagingOptions().getPageSize());
        List<String> fieldNames = new ArrayList<>(Arrays.asList(
                appUserSearchRequest.getKeyword(),
                appUserSearchRequest.getUsername(),
                appUserSearchRequest.getFirstname(),
                appUserSearchRequest.getLastname()
        ));
        fieldNames.removeAll(Collections.singleton(""));
        Map<String, AppUserSearchResponse> appUserSearchResponseMap = elasticAppUserService
                .findUsersByKeyword(appUserSearchRequest.getKeyword(), pageable, fieldNames.toArray(String[]::new));
        AppUserSearchResponse appUserSearchResponse = appUserSearchResponseMap.get("userList");
        return ResponseEntity.ok(new ApiResponse(true, appUserSearchResponse));
    }
}
