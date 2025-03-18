const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registro = async (req, res) => {
    try {
        const { email, password } = req.body;
    }
    catch (error){
        console.log(error).message;
    }  
}