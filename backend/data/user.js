import bcryptj from "bcryptjs";

export const users = [
    {
        name: "Admin",
        email: "elijahfx43@gmail.com",
        password: bcryptj.hashSync("07010057350Pe", 10),
        isAdmin: true
    }
]