package com.ameren.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ameren.app.domain.Attendee;
import com.ameren.app.repository.AttendeeRepository;
import com.ameren.app.web.rest.errors.BadRequestAlertException;
import com.ameren.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Attendee.
 */
@RestController
@RequestMapping("/api")
public class AttendeeResource {

    private final Logger log = LoggerFactory.getLogger(AttendeeResource.class);

    private static final String ENTITY_NAME = "attendee";

    private final AttendeeRepository attendeeRepository;

    public AttendeeResource(AttendeeRepository attendeeRepository) {
        this.attendeeRepository = attendeeRepository;
    }

    /**
     * POST  /attendees : Create a new attendee.
     *
     * @param attendee the attendee to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attendee, or with status 400 (Bad Request) if the attendee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attendees")
    @Timed
    public ResponseEntity<Attendee> createAttendee(@Valid @RequestBody Attendee attendee) throws URISyntaxException {
        log.debug("REST request to save Attendee : {}", attendee);
        if (attendee.getId() != null) {
            throw new BadRequestAlertException("A new attendee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Attendee result = attendeeRepository.save(attendee);
        return ResponseEntity.created(new URI("/api/attendees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attendees : Updates an existing attendee.
     *
     * @param attendee the attendee to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attendee,
     * or with status 400 (Bad Request) if the attendee is not valid,
     * or with status 500 (Internal Server Error) if the attendee couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attendees")
    @Timed
    public ResponseEntity<Attendee> updateAttendee(@Valid @RequestBody Attendee attendee) throws URISyntaxException {
        log.debug("REST request to update Attendee : {}", attendee);
        if (attendee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Attendee result = attendeeRepository.save(attendee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attendee.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attendees : get all the attendees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attendees in body
     */
    @GetMapping("/attendees")
    @Timed
    public List<Attendee> getAllAttendees() {
        log.debug("REST request to get all Attendees");
        return attendeeRepository.findAll();
    }

    /**
     * GET  /attendees/:id : get the "id" attendee.
     *
     * @param id the id of the attendee to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attendee, or with status 404 (Not Found)
     */
    @GetMapping("/attendees/{id}")
    @Timed
    public ResponseEntity<Attendee> getAttendee(@PathVariable Long id) {
        log.debug("REST request to get Attendee : {}", id);
        Optional<Attendee> attendee = attendeeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(attendee);
    }

    /**
     * DELETE  /attendees/:id : delete the "id" attendee.
     *
     * @param id the id of the attendee to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attendees/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttendee(@PathVariable Long id) {
        log.debug("REST request to delete Attendee : {}", id);

        attendeeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
