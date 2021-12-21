package com.profilehut.service;

import com.profilehut.model.AppUser;
import com.profilehut.model.ElasticAppUser;
import com.profilehut.model.Image;
import com.profilehut.model.UserProfile;
import com.profilehut.payload.request.AppUserRequest;
import com.profilehut.payload.response.AppUserResponse;
import com.profilehut.repository.AppUserRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final ElasticAppUserService elasticAppUserService;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, ElasticAppUserService elasticAppUserService) {
        this.appUserRepository = appUserRepository;
        this.elasticAppUserService = elasticAppUserService;
    }

    public Map<String, AppUserResponse> getUserProfile(@NonNull Long id) {
        Map<String, AppUserResponse> userMap = new HashMap<>();
        Optional<AppUser> appUser = appUserRepository.findById(id);
        AppUserResponse appUserResponse = new AppUserResponse();
        appUser.ifPresent(user -> {
            appUserResponse.setUserId(user.getId());
            appUserResponse.setUsername(user.getUsername());
            appUserResponse.setFirstname(user.getFirstname());
            appUserResponse.setLastname(user.getLastname());
            appUserResponse.setVerified(user.isVerified());
            appUserResponse.setOccupation(user.getUserProfile().getOccupation());
            appUserResponse.setGender(user.getUserProfile().getGender());
            appUserResponse.setAbout(user.getUserProfile().getAbout());
            appUserResponse.setBio(user.getUserProfile().getBio());
            appUserResponse.setLocation(user.getUserProfile().getLocation());
            appUserResponse.setPhone(user.getUserProfile().getPhone());
            appUserResponse.setWebsite(user.getUserProfile().getWebsite());
            appUserResponse.setImgUrl(user.getUserProfile().getProfilePic().getUrl());
            userMap.put("user", appUserResponse);
        });
        return userMap;
    }

    public AppUser save(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    public void createUsers(@NonNull List<AppUserRequest> appUserRequests) {
        appUserRequests.forEach(this::createUser);
    }

    private void createUser(@NonNull AppUserRequest appUserRequest) {
        AppUser newUser = buildUser(appUserRequest);
        UserProfile userProfile = new UserProfile();
        buildUserProfile(appUserRequest, userProfile);
        // set child reference (userProfile) in parent entity (appUser)
        newUser.setUserProfile(userProfile);
        // set parent reference (appUser) in child entity (userProfile)
        userProfile.setAppUser(newUser);
        AppUser createdUser = save(newUser);
        ElasticAppUser elasticAppUser = new ElasticAppUser(
                createdUser.getId(),
                createdUser.getUsername(),
                createdUser.getFirstname(),
                createdUser.getLastname(),
                createdUser.isVerified(),
                createdUser.getUserProfile().getProfilePic().getUrl()
        );
        elasticAppUserService.indexAppUser(elasticAppUser);
    }

    @NonNull
    private AppUser buildUser(@NonNull AppUserRequest appUserRequest) {
        AppUser appUser = new AppUser();
        appUser.setUsername(appUserRequest.getUsername());
        appUser.setFirstname(appUserRequest.getFirstname());
        appUser.setLastname(appUserRequest.getLastname());
        appUser.setVerified(true);
        return appUser;
    }

    private void buildUserProfile(@NonNull AppUserRequest appUserRequest, @NonNull UserProfile userProfile) {
        userProfile.setOccupation(appUserRequest.getOccupation());
        userProfile.setGender(appUserRequest.getGender());
        userProfile.setAbout(appUserRequest.getAbout());
        userProfile.setBio(appUserRequest.getBio());
        userProfile.setLocation(appUserRequest.getLocation());
        userProfile.setPhone(appUserRequest.getPhone());
        userProfile.setWebsite(appUserRequest.getWebsite());
        userProfile.setProfilePic(buildImage(appUserRequest));
    }

    @NonNull
    private Image buildImage(@NonNull AppUserRequest appUserRequest) {
        Image profilePic = new Image();
        profilePic.setUrl(appUserRequest.getImgUrl());
        return profilePic;
    }
}
