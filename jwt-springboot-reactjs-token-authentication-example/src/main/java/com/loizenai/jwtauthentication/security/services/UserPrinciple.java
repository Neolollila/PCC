package com.loizenai.jwtauthentication.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.loizenai.jwtauthentication.model.User;

public class UserPrinciple implements UserDetails {
	private static final long serialVersionUID = 1L;

	@Getter
	private Long id;

    @Getter(onMethod = @__(@Override))
    private String username;

    @Getter
    private String email;

    @Getter
    private User user;

    @JsonIgnore
    @Getter(onMethod = @__(@Override))
    private String password;

    @Getter(onMethod = @__(@Override))
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(Long id, String username, String email, String password,
			    		Collection<? extends GrantedAuthority> authorities, User user) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.user = user;
    }

    public static UserPrinciple build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());

        return new UserPrinciple(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities,
                user
        );
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        UserPrinciple user = (UserPrinciple) o;
        return Objects.equals(id, user.id);
    }
}