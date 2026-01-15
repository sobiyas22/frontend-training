function getUserData(userId) {
    return new Promise((resolve, reject) => {
        if (userId === 1) {
            resolve({ name: "Akshay", age: 25, city: "Pune" });
        } else {
            reject("User not found");
        }
    });
}

getUserData(1)
    .then(data => console.log(data))
    .catch(err => console.log(err));


async function getUserDataAsync(userId) {
    try {
        const data = await getUserData(userId);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getUserDataAsync(1);
