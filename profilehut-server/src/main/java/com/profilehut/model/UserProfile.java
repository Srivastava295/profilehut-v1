package com.profilehut.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

@Entity
@Table(name = "user_profile") // optional
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile implements Serializable {

    @Id
    @Column(name = "profile_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_seq")
    @SequenceGenerator(name = "profile_seq", allocationSize = 1)
    private Long id;

    @Column(name = "occupation")
    private String occupation;

    @Convert(converter = GenderConverter.class)
    private Gender gender = Gender.UNDEFINED;

    @Column(name = "about")
    private String about;

    @Column(name = "bio", columnDefinition = "text")
    private String bio;

    @Column(name = "location")
    private String location;

    @Pattern(regexp = "(^$|[0-9]{10})")
    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "website")
    private String website;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_pic_id")
    private Image profilePic;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser appUser;
}
