package com.profilehut.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity // Tells Hibernate to make a table out of this class
@Table(name = "app_user") // optional
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements Serializable {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "firstname")
    private String firstname;

    @NonNull
    @Column(name = "lastname")
    private String lastname;

    @NonNull
    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "is_verified", nullable = false)
    private boolean isVerified = false;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "appUser"
    )
    private UserProfile userProfile;

    @Override
    public String toString() {
        return "AppUser{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", username='" + username + '\'' +
                ", isVerified=" + isVerified +
                '}';
    }
}
