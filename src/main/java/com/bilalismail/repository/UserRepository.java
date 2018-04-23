package com.bilalismail.repository;

import com.bilalismail.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User>
{
    User findUserByEmail(String email);

}
