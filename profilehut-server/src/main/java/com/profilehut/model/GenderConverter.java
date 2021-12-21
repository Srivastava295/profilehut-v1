package com.profilehut.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class GenderConverter implements AttributeConverter<Gender, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Gender gender) {
        if (gender == null) return null;
        return gender.getId();
    }

    @Override
    public Gender convertToEntityAttribute(Integer id) {
        return Gender.getGender(id);
    }
}
