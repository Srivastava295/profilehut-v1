package com.profilehut;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.profilehut.payload.request.AppUserRequest;
import com.profilehut.service.AppUserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Log4j2
@SpringBootApplication
public class ProfilehutServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProfilehutServerApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(AppUserService appUserService) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<AppUserRequest>> typeReference = new TypeReference<>() {};
            InputStream inputStream = TypeReference.class.getResourceAsStream("/json/users.json");
            try {
                List<AppUserRequest> appUserRequests = mapper.readValue(inputStream, typeReference);
                appUserService.createUsers(appUserRequests);
            } catch (IOException ioe) {
                log.error("Unable to save users to database: {}", ioe.getLocalizedMessage());
            }
        };
    }
}
