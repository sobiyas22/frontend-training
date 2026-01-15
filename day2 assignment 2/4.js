// const user = {
//     name: "Akshay",
//     age: 25,
//     city: "Pune"
//   };
  
//   Object.keys(user).forEach(key => {
//     console.log(key, user[key]);
//   });
  
//   console.log(Object.values(user));
  

//   user.mobileNumber = "9999999999";
//   delete user.city;
  
//   console.log(user);

const users = [
    { name: "Pratik", role: "admin" },
    { name: "Amit", role: "user" },
    { name: "Neha", role: "admin" },
    { name: "Ravi", role: "user" }
  ];
  
  const grouped = users.reduce((acc, curr) => {
    acc[curr.role] = acc[curr.role] || [];
    acc[curr.role].push(curr);
    return acc;
  }, {});
  
  console.log(grouped);
  
  