package com.ameren.app.web.rest;

import com.ameren.app.HackathonApp;

import com.ameren.app.domain.Attendee;
import com.ameren.app.repository.AttendeeRepository;
import com.ameren.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.ameren.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AttendeeResource REST controller.
 *
 * @see AttendeeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HackathonApp.class)
public class AttendeeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAttendeeMockMvc;

    private Attendee attendee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttendeeResource attendeeResource = new AttendeeResource(attendeeRepository);
        this.restAttendeeMockMvc = MockMvcBuilders.standaloneSetup(attendeeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attendee createEntity(EntityManager em) {
        Attendee attendee = new Attendee()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE);
        return attendee;
    }

    @Before
    public void initTest() {
        attendee = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttendee() throws Exception {
        int databaseSizeBeforeCreate = attendeeRepository.findAll().size();

        // Create the Attendee
        restAttendeeMockMvc.perform(post("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendee)))
            .andExpect(status().isCreated());

        // Validate the Attendee in the database
        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeCreate + 1);
        Attendee testAttendee = attendeeList.get(attendeeList.size() - 1);
        assertThat(testAttendee.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAttendee.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAttendee.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createAttendeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attendeeRepository.findAll().size();

        // Create the Attendee with an existing ID
        attendee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttendeeMockMvc.perform(post("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendee)))
            .andExpect(status().isBadRequest());

        // Validate the Attendee in the database
        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = attendeeRepository.findAll().size();
        // set the field null
        attendee.setName(null);

        // Create the Attendee, which fails.

        restAttendeeMockMvc.perform(post("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendee)))
            .andExpect(status().isBadRequest());

        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = attendeeRepository.findAll().size();
        // set the field null
        attendee.setEmail(null);

        // Create the Attendee, which fails.

        restAttendeeMockMvc.perform(post("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendee)))
            .andExpect(status().isBadRequest());

        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = attendeeRepository.findAll().size();
        // set the field null
        attendee.setPhone(null);

        // Create the Attendee, which fails.

        restAttendeeMockMvc.perform(post("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendee)))
            .andExpect(status().isBadRequest());

        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAttendees() throws Exception {
        // Initialize the database
        attendeeRepository.saveAndFlush(attendee);

        // Get all the attendeeList
        restAttendeeMockMvc.perform(get("/api/attendees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attendee.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }
    
    @Test
    @Transactional
    public void getAttendee() throws Exception {
        // Initialize the database
        attendeeRepository.saveAndFlush(attendee);

        // Get the attendee
        restAttendeeMockMvc.perform(get("/api/attendees/{id}", attendee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attendee.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAttendee() throws Exception {
        // Get the attendee
        restAttendeeMockMvc.perform(get("/api/attendees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttendee() throws Exception {
        // Initialize the database
        attendeeRepository.saveAndFlush(attendee);

        int databaseSizeBeforeUpdate = attendeeRepository.findAll().size();

        // Update the attendee
        Attendee updatedAttendee = attendeeRepository.findById(attendee.getId()).get();
        // Disconnect from session so that the updates on updatedAttendee are not directly saved in db
        em.detach(updatedAttendee);
        updatedAttendee
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE);

        restAttendeeMockMvc.perform(put("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttendee)))
            .andExpect(status().isOk());

        // Validate the Attendee in the database
        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeUpdate);
        Attendee testAttendee = attendeeList.get(attendeeList.size() - 1);
        assertThat(testAttendee.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAttendee.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAttendee.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingAttendee() throws Exception {
        int databaseSizeBeforeUpdate = attendeeRepository.findAll().size();

        // Create the Attendee

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttendeeMockMvc.perform(put("/api/attendees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendee)))
            .andExpect(status().isBadRequest());

        // Validate the Attendee in the database
        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttendee() throws Exception {
        // Initialize the database
        attendeeRepository.saveAndFlush(attendee);

        int databaseSizeBeforeDelete = attendeeRepository.findAll().size();

        // Get the attendee
        restAttendeeMockMvc.perform(delete("/api/attendees/{id}", attendee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Attendee> attendeeList = attendeeRepository.findAll();
        assertThat(attendeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attendee.class);
        Attendee attendee1 = new Attendee();
        attendee1.setId(1L);
        Attendee attendee2 = new Attendee();
        attendee2.setId(attendee1.getId());
        assertThat(attendee1).isEqualTo(attendee2);
        attendee2.setId(2L);
        assertThat(attendee1).isNotEqualTo(attendee2);
        attendee1.setId(null);
        assertThat(attendee1).isNotEqualTo(attendee2);
    }
}
