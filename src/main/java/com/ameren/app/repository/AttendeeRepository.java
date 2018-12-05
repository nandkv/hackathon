package com.ameren.app.repository;

import com.ameren.app.domain.Attendee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Attendee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

}
