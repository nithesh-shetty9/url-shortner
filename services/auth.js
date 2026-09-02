const sessiontouser=new Map();
function setuser(id,user){
    sessiontouser.set(id,user);
}
function getuser(id){
    return sessiontouser.get(id);
}
module.exports={
    setuser,
    getuser
}