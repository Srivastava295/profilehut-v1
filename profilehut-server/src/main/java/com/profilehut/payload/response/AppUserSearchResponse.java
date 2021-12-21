package com.profilehut.payload.response;

import com.profilehut.model.ElasticAppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUserSearchResponse {

    private List<ElasticAppUser> appUserList;

    private long appUserCount;
}
