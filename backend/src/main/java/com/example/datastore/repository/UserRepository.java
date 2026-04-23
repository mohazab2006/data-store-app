package com.example.datastore.repository;

import com.example.datastore.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    private final DataSource dataSource;

    public UserRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public User create(User user) {
        final String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setInt(3, user.getAge());
            statement.executeUpdate();

            try (ResultSet keys = statement.getGeneratedKeys()) {
                if (keys.next()) {
                    user.setId(keys.getLong(1));
                }
            }
            return user;
        } catch (SQLException ex) {
            throw new DataAccessException("Failed to create user", ex) {};
        }
    }

    public List<User> findAll() {
        final String sql = "SELECT id, name, email, age FROM users";
        List<User> users = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                users.add(mapRow(resultSet));
            }
            return users;
        } catch (SQLException ex) {
            throw new DataAccessException("Failed to fetch users", ex) {};
        }
    }

    public Optional<User> findById(Long id) {
        final String sql = "SELECT id, name, email, age FROM users WHERE id = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return Optional.of(mapRow(resultSet));
                }
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new DataAccessException("Failed to fetch user by id", ex) {};
        }
    }

    public boolean update(Long id, User user) {
        final String sql = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setInt(3, user.getAge());
            statement.setLong(4, id);
            return statement.executeUpdate() > 0;
        } catch (SQLException ex) {
            throw new DataAccessException("Failed to update user", ex) {};
        }
    }

    public boolean deleteById(Long id) {
        final String sql = "DELETE FROM users WHERE id = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);
            return statement.executeUpdate() > 0;
        } catch (SQLException ex) {
            throw new DataAccessException("Failed to delete user", ex) {};
        }
    }

    private User mapRow(ResultSet resultSet) throws SQLException {
        return new User(
                resultSet.getLong("id"),
                resultSet.getString("name"),
                resultSet.getString("email"),
                resultSet.getInt("age")
        );
    }
}
