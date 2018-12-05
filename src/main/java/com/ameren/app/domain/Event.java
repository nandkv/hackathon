package com.ameren.app.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "event_date", nullable = false)
    private Instant eventDate;

    @ManyToMany
    @JoinTable(name = "event_attendee",
               joinColumns = @JoinColumn(name = "events_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "attendees_id", referencedColumnName = "id"))
    private Set<Attendee> attendees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Event name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public Event eventDate(Instant eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public Set<Attendee> getAttendees() {
        return attendees;
    }

    public Event attendees(Set<Attendee> attendees) {
        this.attendees = attendees;
        return this;
    }

    public Event addAttendee(Attendee attendee) {
        this.attendees.add(attendee);
        attendee.getEvents().add(this);
        return this;
    }

    public Event removeAttendee(Attendee attendee) {
        this.attendees.remove(attendee);
        attendee.getEvents().remove(this);
        return this;
    }

    public void setAttendees(Set<Attendee> attendees) {
        this.attendees = attendees;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", eventDate='" + getEventDate() + "'" +
            "}";
    }
}
