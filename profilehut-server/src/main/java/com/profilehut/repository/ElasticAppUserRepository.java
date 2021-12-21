package com.profilehut.repository;

import com.profilehut.model.ElasticAppUser;
import com.profilehut.payload.response.AppUserSearchResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface ElasticAppUserRepository {

    void indexAppUser(@NotNull ElasticAppUser elasticAppUser);

    Map<String, AppUserSearchResponse> searchAppUsers(String keyword, Pageable pageable, String... fieldNames);
}
