// Switch to test database
use test

//Create collection "users"
db.createCollection("users")

//Create collection "articles"
db.createCollection("articles")

// Delete collection "articles"
db.articles.drop()

// Add one user to collection
db.users.insertOne(
    {
    "name":"John",
    "email":"test@gmail.com",
    "age":33, 
    "hasCar":true, 
    "favColors":["Зелений","Червоний", "Чорний"], 
    "child":{"name":"Jack","surname":"Charley","age":5}
    }
    )

// Add many users to collection
db.users.insertMany(
    [
        {
            "name":"Mark",
            "email":"admin@gmail.com", 
            "age":43, 
            "hasCar":false, 
            "favColors":["Червоний", "Білий"], 
            "child":{"name":"Jack","surname":"Charley","age":5}
            },
            {
                "name":"George",
                "email":"admin@gmail.com",
                "age":22,
                "hasCar":false,
                "birthday":new Date('1991-11-27')
                }
                ]
            )

// FIND

// Find all users
db.users.find()

// Find only first two users
test> db.users.find().limit(2)

// Find only first two users and show without id
db.users.find({},{_id:0}).limit(2)

// Find all users and sort them by age in ascending order
db.users.find().sort({age:1})

// Find all users and sort them by age in descending order
db.users.find().sort({age:-1})

// Find only first two users and sort them by age in descending order
db.users.find().sort({age:-1}).limit(2)

// Find all users and sort them by age and email in descending order
db.users.find().sort({age:-1, email:-1})

// Find all users whose age is 22 y.o.
db.users.find({age:22})

// Find all users whose age is 22 y.o. and email is admin@gmail.com
db.users.find({age:22, email:"admin@gmail.com"})

// Find all users whose age is 22 y.o. or email is admin@gmail.com
db.users.find({$or: [{age:22},{email:"admin@gmail.com"}]})

// Find all users whose age is less than 38 y.o. or email is admin@gmail.com
db.users.find({$or: [{age: {$lt:38}},{email:"admin@gmail.com"}]})

// Find all users whose age is more than 38 y.o.
db.users.find({age: {$gt:38}})

// Find all users whose age is 38 y.o. or more
db.users.find({age: {$gte:38}})

// Find all users whose names are John, Mark, George
db.users.find({name: {$in: ["John", "Mark", "George"]}})

// Find all users whose names are not John and Mark
db.users.find({name: {$nin: ["John", "Mark"]}})

// Find all users who have children
db.users.find({child: {$exists:true}})

// Find all users who have only two favourite colors
db.users.find({favColors: {$size:2}})

// Find all users whose second favourite colour is Червоний
db.users.find({"favColors.1": "Червоний"})

// Find only unique emails
db.users.distinct("email")


// UPDATE

// Change the age of one user from 22 to 25
db.users.updateOne({age:22}, {$set: {age:25}})

// Change the age of all users from 25 to 23
db.users.updateMany({age:25}, {$set: {age:23}})

// Change name and email of all users whose age is 23
db.users.updateOne({age:23}, {$set: {name:"User", email: "test@mail.com"}})

// Change parameters of one user whose age is 43 y.o.
db.users.replaceOne({age:43}, {name: "New User", hasCar:2, password:"12345", hasWife:true })

// Delete all users between the ages of 22 and 33 years inclusive.
db.users.deleteMany({age: {$gte:22}, age: {$lte: 38}})

// Combine several commands in one query
db.users.bulkWrite(
    [
    {
        insertOne: {
            "document": {name: "Mike", age: 33, email: "mike@gmail.com"}
        }
    }, 
    {
        deleteOne: {
            filter: {age:43}
        }
    }, 
    {
        updateMany: {
            filter: {name: "Mike"}, 
            update: {$set: {email: "test@test.com"}}
    }
    }, 
    {
        replaceOne: {
            filter: {name: "Jack"}, 
            replacement: {name: "Джек", age: 18, email: "hellojack@gmail.com"}
        }
    }
]
)

// Count the amount of users who are 18 y.o.
db.users.countDocuments({age:18})

// Count the amount of users whose name is Mike
db.users.countDocuments({name:"Mike"})

// Sum the age of users with the same names and group them by id, name, age
db.users.aggregate([{$match: {}}, {$group : {_id: "$name", age: {$sum:"$age"}}}])