package com.profilehut.repository.impl;

import com.profilehut.model.ElasticAppUser;
import com.profilehut.payload.response.AppUserSearchResponse;
import com.profilehut.repository.ElasticAppUserRepository;
import lombok.NonNull;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;


@Repository
public class ElasticAppUserRepositoryImpl implements ElasticAppUserRepository {

    @Value("${app.elasticsearch.user.index}")
    private String indexName;

    private final ElasticsearchOperations elasticsearchOperations;

    @Autowired
    public ElasticAppUserRepositoryImpl(ElasticsearchOperations elasticsearchOperations) {
        this.elasticsearchOperations = elasticsearchOperations;
    }

    @Override
    public void indexAppUser(@NotNull ElasticAppUser elasticAppUser) {
        String docId = elasticAppUser.getUserId() + "";
        IndexQuery indexQuery = new IndexQueryBuilder()
                .withId(docId)
                .withObject(elasticAppUser)
                .build();
        elasticsearchOperations.index(indexQuery, IndexCoordinates.of(indexName));
    }

    @Override
    public Map<String, AppUserSearchResponse> searchAppUsers(@NonNull String keyword, Pageable pageable,
                                                             String... fieldNames) {
        if (keyword.length() <= 3) {
            return getAppUserSearchResultsMap(pageable.getPageNumber(), pageable.getPageSize(),
                    getAllNamesQueryBuilder(keyword));
        }

        QueryBuilder queryBuilder = QueryBuilders.multiMatchQuery(keyword, fieldNames).fuzziness(Fuzziness.AUTO);
        return getAppUserSearchResultsMap(pageable.getPageNumber(), pageable.getPageSize(), queryBuilder);
    }

    @NonNull
    private Map<String, AppUserSearchResponse> getAppUserSearchResultsMap(int pageNumber, int pageSize,
                                                                          QueryBuilder queryBuilder) {
        Map<String, AppUserSearchResponse> appUserSearchResultsMap = new HashMap<>();
        Query searchQuery = new NativeSearchQueryBuilder()
                .withQuery(queryBuilder)
                .withFilter(queryBuilder)
                .withSearchType(SearchType.DEFAULT)
                .withPageable(PageRequest.of(pageNumber, pageSize))
                .build();
        SearchHits<ElasticAppUser> searchHits = elasticsearchOperations.search(searchQuery, ElasticAppUser.class,
                IndexCoordinates.of(indexName));
        if (searchHits.isEmpty()) {
            appUserSearchResultsMap.put("userList", new AppUserSearchResponse(List.of(), 0));
        } else {
            List<ElasticAppUser> appUserList = searchHits.getSearchHits()
                    .stream()
                    .parallel()
                    .map(SearchHit::getContent)
                    .collect(Collectors.toList());
            long appUserCount = searchHits.getTotalHits();
            appUserSearchResultsMap.put("userList", new AppUserSearchResponse(appUserList, appUserCount));
        }
        return appUserSearchResultsMap;
    }

    private QueryBuilder getAllNamesQueryBuilder(String keyword) {
        return QueryBuilders.boolQuery()
                .must(QueryBuilders.wildcardQuery("firstname", "*" + keyword + "*"))
                .must(QueryBuilders.wildcardQuery("lastname", "*" + keyword + "*"))
                .must(QueryBuilders.wildcardQuery("username", "*" + keyword + "*"));
    }
}
