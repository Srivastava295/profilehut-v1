package com.profilehut.service;

import com.profilehut.model.ElasticAppUser;
import com.profilehut.payload.response.AppUserSearchResponse;
import com.profilehut.repository.ElasticAppUserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ElasticAppUserService {

    private final ElasticAppUserRepository elasticAppUserRepository;

    @Autowired
    public ElasticAppUserService(ElasticAppUserRepository elasticAppUserRepository) {
        this.elasticAppUserRepository = elasticAppUserRepository;
    }

    public void indexAppUser(@NotNull ElasticAppUser elasticAppUser) {
        elasticAppUserRepository.indexAppUser(elasticAppUser);
    }

    public Map<String, AppUserSearchResponse> findUsersByKeyword(String keyword, Pageable pageable,
                                                                 String... fieldNames) {
        return elasticAppUserRepository.searchAppUsers(keyword, pageable, fieldNames);
    }
}
