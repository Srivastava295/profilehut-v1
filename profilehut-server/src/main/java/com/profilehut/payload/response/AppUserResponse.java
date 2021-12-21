package com.profilehut.payload.response;

import com.profilehut.model.Gender;
import com.profilehut.model.GenderConverter;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Convert;

@Getter
@Setter
public class AppUserResponse {

    private Long userId;

    private String username;

    private String firstname;

    private String lastname;

    private String occupation;

    private boolean isVerified;

    @Convert(converter = GenderConverter.class)
    private Gender gender;

    private String about;

    private String bio;

    private String location;

    private String phone;

    private String website;

    private String imgUrl;

}
