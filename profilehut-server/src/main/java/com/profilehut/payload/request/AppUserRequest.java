package com.profilehut.payload.request;

import com.profilehut.model.Gender;
import com.profilehut.model.GenderConverter;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Convert;

@Getter
@Setter
public class AppUserRequest {

    private String username;

    private String firstname;

    private String lastname;

    private String email;

    private String occupation;

    @Convert(converter = GenderConverter.class)
    private Gender gender;

    private String about;

    private String bio;

    private String location;

    private String phone;

    private String website;

    private String imgUrl;

}
