package com.profilehut.payload.request;

import com.profilehut.payload.options.PagingOptions;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppUserSearchRequest {

    private String keyword;

    private String username;

    private String firstname;

    private String lastname;

    private PagingOptions pagingOptions;

}
