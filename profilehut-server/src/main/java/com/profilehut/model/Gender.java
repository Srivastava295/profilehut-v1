package com.profilehut.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public enum Gender implements Serializable {

    UNDEFINED(0),
    MALE(1),
    FEMALE(2);

    private final int id;

    public static Gender getGender(Integer id) {
        if (id == null) {
            return null;
        }

        for (Gender gender : values()) {
            if (gender.getId() == id) {
                return gender;
            }
        }
        return null;
    }
}
