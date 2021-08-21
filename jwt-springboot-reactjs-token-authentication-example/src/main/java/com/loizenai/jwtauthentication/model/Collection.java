package com.loizenai.jwtauthentication.model;

import lombok.Getter;
import lombok.Setter;



import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "collections")
public class Collection {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @NotBlank
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "collection_item",
//            joinColumns = @JoinColumn(name = "collection_id"),
//            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private String name;

    @Getter
    @Setter
    @NotBlank
    private String description;



    @Getter
    @Setter
//    @NotBlank
    private String Image;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_theme")
    private Theme theme;

    public Collection() {};



}
