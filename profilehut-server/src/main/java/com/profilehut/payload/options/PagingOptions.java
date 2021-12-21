package com.profilehut.payload.options;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;

/**
 * This class holds pagination details
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagingOptions {

    /**
     * page number
     */
    @Min(value = 0, message = "Offset must be greater than or equal to 0.")
    private int offset;

    /**
     * page size
     */
    @Min(value = 1, message = "Page size must be greater than or equals to 1.")
    private int pageSize;

}
