package com.ameren.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @OneToMany(mappedBy = "organization")
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

    public Organization name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public Organization city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<Attendee> getAttendees() {
        return attendees;
    }

    public Organization attendees(Set<Attendee> attendees) {
        this.attendees = attendees;
        return this;
    }

    public Organization addAttendee(Attendee attendee) {
        this.attendees.add(attendee);
        attendee.setOrganization(this);
        return this;
    }

    public Organization removeAttendee(Attendee attendee) {
        this.attendees.remove(attendee);
        attendee.setOrganization(null);
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
        Organization organization = (Organization) o;
        if (organization.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organization.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
