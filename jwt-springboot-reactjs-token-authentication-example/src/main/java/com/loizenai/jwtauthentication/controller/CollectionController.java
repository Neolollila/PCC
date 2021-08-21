package com.loizenai.jwtauthentication.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.loizenai.jwtauthentication.model.Collection;
import com.loizenai.jwtauthentication.model.Theme;
import com.loizenai.jwtauthentication.repository.CollectionRepository;
import com.loizenai.jwtauthentication.repository.ThemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/collection")
public class CollectionController {

    @Autowired
    public ThemeRepository themeRepository;

    @Autowired
    public CollectionRepository collectionRepository;

    @GetMapping("/theme")
    public ResponseEntity <List<Theme>> getThemeList() {
        return ResponseEntity.ok(
            this.themeRepository.findAll()
        );
    }

    @PostMapping("/new")
    public ResponseEntity<Collection> createCollection(@RequestBody ObjectNode json){
        Collection newCollection = new Collection();
        newCollection.setName(json.get("name").asText());
        newCollection.setTheme(themeRepository.getOne(json.get("theme").asLong()));
        newCollection.setDescription(json.get("description").asText());
        return new ResponseEntity<>(collectionRepository.save(newCollection), HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity <List<Collection>> getCurrentUserCollections() {
        return ResponseEntity.ok(
                this.collectionRepository.findAll()
        );
    }

    @DeleteMapping("/delete/{id}")

    public ResponseEntity<Void> removeCollection(@PathVariable(value = "id") Long id){
        this.collectionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
