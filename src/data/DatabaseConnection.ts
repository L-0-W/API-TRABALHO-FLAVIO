import { User } from "../Interfaces"

export const user_db_connection = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './src/DB/user.sqlite'
    }
})


export const post_db_connection = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './src/DB/post.sqlite'
    }
})
