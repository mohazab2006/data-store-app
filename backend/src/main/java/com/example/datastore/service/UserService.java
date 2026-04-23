package com.example.datastore.service;

import com.example.datastore.exception.BadRequestException;
import com.example.datastore.exception.ConflictException;
import com.example.datastore.exception.NotFoundException;
import com.example.datastore.model.User;
import com.example.datastore.repository.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        validateUser(user);

        try {
            return userRepository.create(user);
        } catch (DataAccessException ex) {
            throw mapDataAccessException(ex, "create user");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + id));
    }

    public User updateUser(Long id, User user) {
        validateUser(user);
        if (!userRepository.findById(id).isPresent()) {
            throw new NotFoundException("User not found with id: " + id);
        }

        try {
            boolean updated = userRepository.update(id, user);
            if (!updated) {
                throw new NotFoundException("User not found with id: " + id);
            }
            return userRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("User not found with id: " + id));
        } catch (DataAccessException ex) {
            throw mapDataAccessException(ex, "update user");
        }
    }

    public void deleteUser(Long id) {
        boolean deleted = userRepository.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("User not found with id: " + id);
        }
    }

    private void validateUser(User user) {
        if (user == null) {
            throw new BadRequestException("Request body is required.");
        }
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new BadRequestException("Name cannot be empty.");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new BadRequestException("Email cannot be empty.");
        }
        if (user.getAge() == null || user.getAge() <= 0) {
            throw new BadRequestException("Age must be a positive number.");
        }
    }

    private RuntimeException mapDataAccessException(DataAccessException ex, String operation) {
        Throwable cause = ex.getCause();
        if (cause != null && cause.getMessage() != null
                && cause.getMessage().toLowerCase().contains("duplicate entry")) {
            return new ConflictException("Email already exists.");
        }
        return new RuntimeException("Database error while trying to " + operation + ".", ex);
    }
}
