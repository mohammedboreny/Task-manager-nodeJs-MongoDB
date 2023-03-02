require('../src/db/mongoose');
const User=require('../src/models/user')
const Task=require('../src/models/task')
// 63ffdb94c83516f38b385012



// User.findByIdAndUpdate("63ffdb94c83516f38b385012",{age:27}).then((user) => {
//     console.log(user);
//     return User.countDocuments()
// }).then((value) => {
//     console.log( "the count is " ,value);
// }).catch((value) => {
//     console.log(value);
// })

// const updateAgeAndCount = async (id,age) => {
//     const user = await User.findOneAndUpdate(id, { age });
//     const count = await User.countDocuments({ age });

//     return {count,user}
// }

// updateAgeAndCount("63ffdb94c83516f38b385012",2).then((value) => {
//     console.log(value.user,value.count);
// }).catch((error) => {
//     console.log(error);
// })



const deleteTaskAndCount = async (id) => {
    const countTask=await Task.countDocuments(id)
    const task = await Task.findByIdAndDelete(id)
    if (task==undefined) {
        throw new Error(`there is no task with id =${id}`)
    }
    return {countTask,task}
}


deleteTaskAndCount('63ffdd3a9a7bbdb8bbb19647').then((value) => {
    console.log(value.task);
    console.log(value.count);
}).catch((error) => {
    console.log(error);
})


