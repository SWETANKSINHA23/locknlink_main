export const testUsers = {
    validUser: {
        email: 'test@example.com',
        password: 'Test123456',
    },
    newUser: {
        email: 'newuser@example.com',
        password: 'NewUser123456',
    },
};

export const testUrls = {
    validUrl: 'https://www.example.com',
    longUrl: 'https://www.example.com/very/long/path/to/some/resource/that/needs/shortening',
    customAlias: 'myalias',
};

export const generateUniqueEmail = () => {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
};
