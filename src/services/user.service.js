import UserRepository from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export const createUserService = async (userData) => {
    const user = await userRepository.create(userData);
    return user;
}

export const findUserByEmail = async (email) => {
    const user = await userRepository.findByEmail(email);
    return user;
}