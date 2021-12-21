package com.profilehut.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.elasticsearch.index.VersionType;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(
        indexName = "${app.elasticsearch.user.index}",
        versionType = VersionType.INTERNAL,
        createIndex = false
)
@Setting(settingPath = "es_user_settings.json")
public class ElasticAppUser {

    @Id
    @Field(name = "userId")
    private Long userId;

    @MultiField(
            mainField = @Field(
                    name = "username",
                    type = FieldType.Text,
                    fielddata = true,
                    analyzer = "autocomplete",
                    searchAnalyzer = "autocomplete_search"
            ),
            otherFields = {
                    @InnerField(
                            suffix = "edge_ngram",
                            type = FieldType.Text,
                            analyzer = "edge_ngram_analyzer",
                            searchAnalyzer = "keyword_analyzer"
                    ),
                    @InnerField(
                            suffix = "ngram",
                            type = FieldType.Text,
                            analyzer = "ngram_analyzer",
                            searchAnalyzer = "keyword_analyzer"
                    ),
                    @InnerField(
                            suffix = "english",
                            type = FieldType.Text,
                            analyzer = "english_analyzer"
                    ),
            }
    )
    private String username;

    @MultiField(
            mainField = @Field(
                    name = "firstname",
                    type = FieldType.Text,
                    fielddata = true,
                    analyzer = "autocomplete",
                    searchAnalyzer = "autocomplete_search"
            ),
            otherFields = {
                    @InnerField(
                            suffix = "edge_ngram",
                            type = FieldType.Text,
                            analyzer = "edge_ngram_analyzer",
                            searchAnalyzer = "keyword_analyzer"
                    ),
                    @InnerField(
                            suffix = "ngram",
                            type = FieldType.Text,
                            analyzer = "ngram_analyzer",
                            searchAnalyzer = "keyword_analyzer"
                    ),
                    @InnerField(
                            suffix = "english",
                            type = FieldType.Text,
                            analyzer = "english_analyzer"
                    ),
            }
    )
    private String firstname;

    @MultiField(
            mainField = @Field(
                    name = "lastname",
                    type = FieldType.Text,
                    fielddata = true,
                    analyzer = "autocomplete",
                    searchAnalyzer = "autocomplete_search"
            ),
            otherFields = {
                    @InnerField(
                            suffix = "edge_ngram",
                            type = FieldType.Text,
                            analyzer = "edge_ngram_analyzer",
                            searchAnalyzer = "keyword_analyzer"
                    ),
                    @InnerField(
                            suffix = "ngram",
                            type = FieldType.Text,
                            analyzer = "ngram_analyzer",
                            searchAnalyzer = "keyword_analyzer"
                    ),
                    @InnerField(
                            suffix = "english",
                            type = FieldType.Text,
                            analyzer = "english_analyzer"
                    ),
            }
    )
    private String lastname;

    @Field(name = "is_verified")
    private Boolean isVerified;

    @Field(name = "profilePicUrl")
    private String profilePicUrl;
}
